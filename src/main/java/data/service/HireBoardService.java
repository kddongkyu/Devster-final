package data.service;

import java.util.List;
import java.util.Map;

import data.dto.HireBoardDto;
import data.entity.HireBoardEntity;
import data.entity.HireBookmarkEntity;
import data.repository.HireBoardRepository;
import data.repository.HireBookmarkRepository;
import naver.cloud.NcpObjectStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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

    // @Autowired
    // HireBoardMapper hireBoardMapper;

    private final Logger logger = LoggerFactory.getLogger(HireBoardService.class);
    
    private final HireBoardRepository hireBoardRepository;
    private final HireBookmarkRepository hireBookmarkRepository;

    @Autowired
    private NcpObjectStorageService storageService;
    
    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public HireBoardService(HireBoardRepository hireBoardRepository, HireBookmarkRepository hireBoardBookmarkRepository) {
        this.hireBoardRepository = hireBoardRepository;
        this.hireBookmarkRepository = hireBoardBookmarkRepository;
    }

    public void insertHireBoard(HireBoardDto dto){ 
        HireBoardEntity entity = HireBoardEntity.toHireBoardEntity(dto);
            hireBoardRepository.save(entity);

    }

    // public HireBoardDto insertHireBoard(HireBoardDto dto){ 
        
    //     HireBoardEntity entity = HireBoardEntity.toHireBoardEntity(dto);
    //         hireBoardRepository.save(entity);

    //         return dto;
    
    // }



    // public List<HireBoardDto> getAllData(){
    //     try{
    //         List<HireBoardDto> list = new ArrayList<>();
    //         for(HireBoardEntity entity : hireBoardRepository.findAll()){
    //             list.add(HireBoardDto.toHireBoardDto(entity));
    //         }
    //         return list;
    //     } catch(Exception e){
    //         logger.error("Error occurred while getting all hireboard data", e);
    //         throw e;
    //     }
    // }    


    public Map<String,Object> list(int currentPage){
        int totalCount = hireBoardRepository.countBy().intValue();
        int perPage = 10;
        int startNum;
        int no;
        startNum = (currentPage - 1) * perPage;
        no = totalCount - startNum;
        Pageable pageable = PageRequest.of(startNum, perPage, Sort.by(Sort.Direction.DESC, "hbIdx"));
        Map<String,Object> map = new HashMap<>(); 
        map.put("list",hireBoardRepository.findAll(pageable).getContent());
        map.put("currentPage",currentPage);
        map.put("totalCount",totalCount);
        map.put("no",no);
        return map;
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


    public void deleteHireBoard(int idx){
        try {
            hireBoardRepository.deleteById((Integer)idx);
        } catch (Exception e) {
            logger.error("Error occurred while deleting a entity",e);
        }
    }


    public void updateHireBoard(HireBoardDto dto,MultipartFile upload,int currentPage){

        String filename="";
        HireBoardEntity entity = hireBoardRepository.findById(dto.getHb_idx())
                .orElseThrow(() -> new EntityNotFoundException("해당 idx의 게시물이 존재하지 않습니다:" +dto.getHb_idx()));
        if(!upload.getOriginalFilename().equals("")) {
            filename= entity.getHBphoto();
            storageService.deleteFile(bucketName,"devster/hireboard",filename);
            filename=storageService.uploadFile(bucketName, "devster/hireboard", upload);
        }
        try {
            entity.setHBphoto(filename);
            hireBoardRepository.save(entity);
        } catch (Exception e) {
            // TODO: handle exception
            logger.error("Error occurred while inserting hireboard",e);
            throw e;
        }
    }

    // public int getHireTotalCount(){
    //     return hireBoardRepository.countBy().intValue();
    // }





    // public List<HireBoardEntity> getHirePagingList(int start, int perPage){
    //     Pageable pageable = PageRequest.of(start, perPage, Sort.by(Sort.Direction.DESC, "hbIdx"));
    //     return hireBoardRepository.findAll(pageable).getContent();
    // }
 

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


