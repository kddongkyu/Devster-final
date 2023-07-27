package data.service;

import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.stream.Collectors;

import data.dto.HireBoardDto;
import data.entity.CompanyMemberEntity;
import data.entity.HireBoardEntity;
import data.entity.HireBookmarkEntity;
import data.repository.CompanyMemberRepository;
import data.repository.HireBoardRepository;
import data.repository.HireBookmarkRepository;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
import data.mapper.HireBoardMapper;
import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
@Slf4j
public class HireBoardService {

    
    

    private final Logger logger = LoggerFactory.getLogger(HireBoardService.class);
    
    @Autowired
    private final HireBoardMapper hireBoardMapper;
    private final HireBoardRepository hireBoardRepository;
    private final HireBookmarkRepository hireBookmarkRepository;
    private final NcpObjectStorageService storageService;
    private final CompanyMemberRepository companyMemberRepository;
    
    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public HireBoardService(HireBoardMapper hireBoardMapper, HireBoardRepository hireBoardRepository, HireBookmarkRepository hireBoardBookmarkRepository,
    NcpObjectStorageService storageService, CompanyMemberRepository companyMemberRepository) {
        this.hireBoardMapper = hireBoardMapper;
        this.hireBoardRepository = hireBoardRepository;
        this.hireBookmarkRepository = hireBoardBookmarkRepository;
        this.storageService = storageService;
        this.companyMemberRepository = companyMemberRepository;
    }


    public HireBoardDto insertHireBoard(HireBoardDto dto, HttpSession session) {
        try {
            if (session.getAttribute("photo") != null) {
                dto.setHb_photo(session.getAttribute("photo").toString());
            }
            HireBoardEntity hireBoard = HireBoardEntity.toHireBoardEntity(dto);
            hireBoardRepository.save(hireBoard);
            session.removeAttribute("photo");
            return dto;
        } catch (Exception e) {
            log.error("insert HireBoard Error", e);
            throw e;
        }
    }

    public List<String> uploadPhoto(List<MultipartFile> upload, HttpSession session) {
        List<String> fullPhoto = new ArrayList<>();
        for (MultipartFile photo : upload) {
            fullPhoto.add(storageService.uploadFile(bucketName, "devster/hboard", photo));
        }
        if (session.getAttribute("photo") != null) {
            storageService.deleteFile(bucketName, "devster/hboard", session.getAttribute("photo").toString());
        }
        session.setAttribute("photo", String.join(",", fullPhoto));
        log.info("HireBoard 사진 업로드 완료");
        return fullPhoto;
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName, "devster/hboard", photo);
        log.info("HireBoard 사진 초기화 완료");
    }








    public Map<String, Object> getPagedHboard(int page, int size,String keyword) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("HBwriteday").descending());
        Page<HireBoardEntity> result;

        if (keyword != null && !keyword.trim().isEmpty()) {
            result = hireBoardRepository.findByHBsubjectContaining(keyword, pageable);
               logger.info("Keyword: " + keyword);
        } else {
            result = hireBoardRepository.findAll(pageable);
        }

        List<Map<String, Object>> hiresWithCompanyInfo = result
                .getContent()
                .stream()
                .map(hireBoardEntity -> {
                    CompanyMemberEntity companyMemberInfo = companyMemberRepository.findById(hireBoardEntity.getCMidx()).orElse(null);
                    Map<String, Object> hireWithCompanyInfo = new HashMap<>();
                    hireWithCompanyInfo.put("hboard", HireBoardDto.toHireBoardDto(hireBoardEntity));
                    if (companyMemberInfo != null) {
                        hireWithCompanyInfo.put("cmCompname", companyMemberInfo.getCMcompname());
                        hireWithCompanyInfo.put("cmPhoto", companyMemberInfo.getCMfilename());
                    }
                    return hireWithCompanyInfo;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("hireBoardList", hiresWithCompanyInfo);
        response.put("totalElements", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());
        response.put("currentPage", result.getNumber() + 1);
        response.put("hasNext", result.hasNext());

        return response;
    }





    public List<HireBoardDto> getPagingList(int start, int perpage) {
        Map<String, Integer> map=new HashMap<>();
        map.put("start", start);
        map.put("perpage", perpage);

        return hireBoardMapper.getPagingList(map);
    }
 
    

    public HireBoardDto findByHbIdx(int idx){
        try {
            HireBoardEntity entity = hireBoardRepository.findById((Integer)idx)
                .orElseThrow(() -> new EntityNotFoundException("해당 idx는 존재하지 않습니다." + idx));
                
            return HireBoardDto.toHireBoardDto(entity);    
        } catch (EntityNotFoundException e) {
            logger.error("Error occurred while getting a entity", e);
            throw e;
        }
    }
    



    public Map<String,Object> getDetailPage(int hb_idx, int m_idx){
        
        //readcount 추가 
        hireBoardMapper.updateReadCount(hb_idx);

        HireBoardEntity entity = hireBoardRepository.findById((Integer)hb_idx)
            .orElseThrow(() -> new EntityNotFoundException("해당 idx는 존재하지 않습니다." + hb_idx));
        HireBoardDto dto = HireBoardDto.toHireBoardDto(entity);    

        //필요한 변수들을 Map 에 담아서 보낸다
        Map<String,Object> map=new HashMap<>();
        map.put("hb_subject",dto.getHb_subject());
        map.put("hb_content",dto.getHb_content());
        map.put("hb_readcount",dto.getHb_readcount());
        map.put("hb_photo",dto.getHb_photo());
        map.put("hb_writeday",dto.getHb_writeday());
        map.put("cm_compname",hireBoardMapper.getCompName(dto.getHb_idx()));
        map.put("cm_filename",hireBoardMapper.getCmFileName(dto.getHb_idx()));


        //북마크 추가 여부 확인 및 역시 map 에 담기 
        boolean isAlreadyAddBkmk = false;
        Map<String,Integer> bmap = new HashMap<>();
        bmap.put("m_idx",m_idx);
        bmap.put("hb_idx",hb_idx);
        Integer getBkmkPointTypeCodeBym_idx = hireBoardMapper.getBkmkInfoBym_idx(bmap);
        if(getBkmkPointTypeCodeBym_idx==null){
            getBkmkPointTypeCodeBym_idx =0;
        }
        if(getBkmkPointTypeCodeBym_idx ==1){
            isAlreadyAddBkmk = true;
        }
        map.put("isAlreadyAddBkmk",isAlreadyAddBkmk);

        return map;
    }





    public void deleteHireBoard(int idx){
        try {
            hireBoardRepository.deleteById((Integer)idx);
        } catch (Exception e) {
            logger.error("Error occurred while deleting a entity",e);
        }
    }


    // public void updateHireBoard(HireBoardDto dto,MultipartFile upload){

    //     String filename="";
    //     HireBoardEntity entity = hireBoardRepository.findById(dto.getHb_idx())
    //             .orElseThrow(() -> new EntityNotFoundException("해당 idx의 게시물이 존재하지 않습니다:" +dto.getHb_idx()));
    //     try {
    //         if(!upload.getOriginalFilename().equals("")) {
    //         filename= entity.getHBphoto();
    //         storageService.deleteFile(bucketName,"devster/hireboard",filename);
    //         filename=storageService.uploadFile(bucketName, "devster/hireboard", upload);
    //         }
    //         entity.setHBphoto(filename);
    //         hireBoardRepository.save(entity);
    //     } catch (Exception e) {
    //         logger.error("Error occurred while inserting hireboard",e);
    //         throw e;
    //     }
    // }

    public void updateHireBoard(HireBoardDto dto){
        try {
            HireBoardEntity entity = HireBoardEntity.toHireBoardEntity(dto);
            hireBoardRepository.save(entity);
        } catch (Exception e) {
            logger.error("Error occurred while updating hireboard",e);
            throw e;
        }
    }

 

    @Transactional
    private HireBookmarkEntity findBookmark(int HBidx,int MIdx){
        return hireBookmarkRepository.findByHBidxAndMIdx(HBidx,MIdx)
        .orElse(new HireBookmarkEntity(HBidx,MIdx));
    }    

    public void addBkmk(int hb_idx, int m_idx){
        try {           
            HireBookmarkEntity hireBookmarkEntity = findBookmark(hb_idx,m_idx);
            
            if(hireBookmarkEntity.getBkmk()==1){
                hireBookmarkRepository.deleteById((Integer)hireBookmarkEntity.getHBbmkidx());
            }else{
                hireBookmarkEntity.setMIdx(m_idx);
                hireBookmarkEntity.setHBidx(hb_idx);
                hireBookmarkRepository.save(hireBookmarkEntity);
            }
            
        } catch (Exception e) {
            logger.error("Error occurred while bookmark",e);
        }
    }    

}



