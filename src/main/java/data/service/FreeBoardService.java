package data.service;

import data.dto.FreeBoardDto;
import data.entity.FreeBoardEntity;
import data.repository.FreeBoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class FreeBoardService {

 

    @Autowired
    private final FreeBoardRepository freeBoardRepository;

    @Autowired
    public FreeBoardService(FreeBoardRepository freeBoardRepository) {
        this.freeBoardRepository = freeBoardRepository;
    }

    public FreeBoardDto insertFreeBoard(FreeBoardDto dto){
        try {
            FreeBoardEntity freeBoard = FreeBoardEntity.toFreeBoardEntity(dto);
            freeBoardRepository.save(freeBoard);
            return dto;
        } catch (Exception e){
            log.error("insert FreeBoard Error",e);
            throw  e;
        }
    }

    public List<FreeBoardDto> getAllFboard(){
        try {
            List<FreeBoardEntity>  entityList = freeBoardRepository.findAll();
            List<FreeBoardDto> dtoList = new ArrayList<>();

            for(FreeBoardEntity entity : entityList) {
                dtoList.add(FreeBoardDto.toFreeBoardDto(entity));
            }

            return dtoList;
        } catch (Exception e){
            log.error("findAll FreeBoardList Error", e);
            throw e;
        }
    }

    public FreeBoardDto getOneFboard(Integer fb_idx){
        try {
            FreeBoardEntity freeBoard = freeBoardRepository.findById((Integer) fb_idx)
                    .orElseThrow(()->new EntityNotFoundException("존재하지 않는 fb_idx : " + fb_idx));

            return  FreeBoardDto.toFreeBoardDto(freeBoard);
        } catch (Exception e){
            log.error("findById getOneFreeBoard Error", e);
            throw e;
        }
    }

    public void deleteById(int fb_idx){
        try {
            freeBoardRepository.deleteById(fb_idx);
        } catch (Exception e) {
            log.error("delete FreeBoard Error",e);
            throw e;
        }
    }

    public void updateFreeBoard(int fb_idx, FreeBoardDto dto){
        try {
            Optional<FreeBoardEntity> e = freeBoardRepository.findById(fb_idx);

            if(e.isPresent()) {
                FreeBoardEntity existingEntity = e.get();
                existingEntity.setFBsubject(dto.getFb_subject());
                existingEntity.setFBcontent(dto.getFb_content());
                existingEntity.setFBphoto(dto.getFb_photo());
                freeBoardRepository.save(existingEntity);
            }

        } catch (Exception e) {
            log.error("update FreeBoard Error", e);
            throw e;
        }
    }

}
