package data.service;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import data.dto.HireBoardDto;
import data.entity.HireBoardEntity;
import data.entity.HireBookmarkEntity;
import data.repository.HireBoardRepository;
import data.repository.HireBookmarkRepository;
import naver.cloud.NcpObjectStorageService;
import data.mapper.HireBoardMapper;

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

    @Autowired
    HireBoardMapper hireBoardMapper;

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

    public Map<String,Object> list(int currentPage){
        //페이징처리
        int totalCount;//총갯수
        int perPage=10;//한페이지당 출력할 글갯수
        int perBlock=5;//출력할 페이지갯수
        int startNum;//db에서 가져올 시작번호
        int startPage;//출력할 시작페이지
        int endPage;//출력할 끝페이지
        int totalPage;//총 페이지수
        int no;//출력할 시작번호

        //총갯수
        totalCount = (int)hireBoardRepository.count();
         //총 페이지수
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
        //시작페이지
        startPage=(currentPage-1)/perBlock*perBlock+1;
        //끝페이지
        endPage=startPage+perBlock-1;
        if(endPage>totalPage)
            endPage=totalPage;
        //시작번호
        startNum=(currentPage-1)*perPage;    
        //각페이지당 출력할 번호
        no=totalCount-(currentPage-1)*perPage;

        Map<String, Integer> map=new HashMap<>();
        map.put("start", startNum);
        map.put("perpage", perPage);
        List<HireBoardDto> list = hireBoardMapper.getPagingList(map);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> parr=new Vector<>();
        for(int i=startPage;i<=endPage;i++){
            parr.add(i);
        }

        //필요한 변수들을 Map 에 담아서 보낸다
        Map<String,Object> smap=new HashMap<>();
        smap.put("totalCount",totalCount);
        smap.put("list",list);
        smap.put("parr",parr);
        smap.put("startPage",startPage);
        smap.put("endPage",endPage);
        smap.put("no",no);
        smap.put("totalPage",totalPage);

        System.out.println(smap);
        return  smap;
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


    // public Map<String,Object> list(int currentPage){
    //     int totalCount = hireBoardRepository.countBy().intValue();
    //     int perPage = 10;
    //     int startNum;
    //     int no;
    //     startNum = (currentPage - 1) * perPage;
    //     no = totalCount - startNum;
    //     Pageable pageable = PageRequest.of(startNum, perPage, Sort.by(Sort.Direction.DESC, "hbIdx"));
    //     Map<String,Object> map = new HashMap<>(); 
    //     // map.put("list",hireBoardRepository.findAll(pageable).getContent());
    //     map.put("currentPage",currentPage);
    //     map.put("totalCount",totalCount);
    //     map.put("no",no);
    //     return map;
    // }

    // public int getTotalCount(){
    //     return (int)hireBoardRepository.count();
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


