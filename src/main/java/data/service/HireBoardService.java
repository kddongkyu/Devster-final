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
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
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


    public void insertHireBoard(HireBoardDto dto){ 
        HireBoardEntity entity = HireBoardEntity.toHireBoardEntity(dto);
            hireBoardRepository.save(entity);
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


    // public Map<String,Object> list(int currentPage){
    
    //     //페이징처리
    //     int totalCount;//총갯수
    //     int perPage=10;//한페이지당 출력할 글갯수
    //     int perBlock=5;//출력할 페이지갯수
    //     int startNum;//db에서 가져올 시작번호
    //     int startPage;//출력할 시작페이지
    //     int endPage;//출력할 끝페이지
    //     int totalPage;//총 페이지수
    //     int no;//출력할 시작번호

    //     //총갯수
    //     totalCount = (int)hireBoardRepository.count();
    //      //총 페이지수
    //     totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
    //     //시작페이지
    //     startPage=(currentPage-1)/perBlock*perBlock+1;
    //     //끝페이지
    //     endPage=startPage+perBlock-1;
    //     if(endPage>totalPage)
    //         endPage=totalPage;
    //     //시작번호
    //     startNum=(currentPage-1)*perPage;    
    //     //각페이지당 출력할 번호
    //     no=totalCount-(currentPage-1)*perPage;

    //     Map<String, Integer> map=new HashMap<>();
    //     map.put("start", startNum);
    //     map.put("perpage", perPage);
    //     List<Map<String,Object>> fullList = new ArrayList<>();
    //     List<HireBoardDto> list = hireBoardMapper.getPagingList(map);
        
    //     for(HireBoardDto dto : list){
    //         Map<String,Object> dmap = new HashMap<>();
    //         dmap.put("cm_compname",hireBoardMapper.getCompName(dto.getCm_idx()));
    //         dmap.put("cm_filename",hireBoardMapper.getCmFileName(dto.getCm_idx()));
    //         dmap.put("hb_subject",dto.getHb_subject());
    //         dmap.put("hb_content",dto.getHb_content());
    //         dmap.put("hb_readcount",dto.getHb_readcount());
    //         dmap.put("hb_writeday",dto.getHb_writeday());
    //         dmap.put("hb_photo",dto.getHb_photo());
    //         fullList.add(dmap);
    //     }

    //     //출력할 페이지번호들을 Vector에 담아서 보내기
    //     Vector<Integer> parr=new Vector<>();
    //     for(int i=startPage;i<=endPage;i++){
    //         parr.add(i);
    //     }

    //     //필요한 변수들을 Map 에 담아서 보낸다
    //     Map<String,Object> smap=new HashMap<>();
    //     smap.put("totalCount",totalCount);
    //     smap.put("list",fullList);
    //     smap.put("parr",parr);
    //     smap.put("startPage",startPage);
    //     smap.put("endPage",endPage);
    //     smap.put("no",no);
    //     smap.put("totalPage",totalPage);

    //     System.out.println(smap);
    //     return  smap;
    // } 


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
        map.put("cm_compname",hireBoardMapper.getCompName(dto.getCm_idx()));
        map.put("cm_filename",hireBoardMapper.getCmFileName(dto.getCm_idx()));


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
            logger.error("Error occurred while inserting hirebookmark",e);
        }
    }    

}



