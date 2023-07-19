package data.service;

import data.dto.resume.ResumeCareerDto;
import data.dto.resume.ResumeDto;
import data.dto.resume.ResumeLicenseDto;
import data.dto.resume.ResumeWrapper;
import data.entity.resume.ResumeCareerEntity;
import data.entity.resume.ResumeEntity;
import data.entity.resume.ResumeLicenseEntity;
import data.repository.resume.ResumeCareerRepository;
import data.repository.resume.ResumeLicenseRepository;
import data.repository.resume.ResumeRepository;
import jwt.setting.settings.JwtService;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeCareerRepository resumeCareerRepository;
    private final ResumeLicenseRepository resumeLicenseRepository;
    private final NcpObjectStorageService storageService;
    private final JwtService jwtService;


    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Value("${naver.translate.client_id}")
    private String client_id;

    @Value("${naver.translate.client_secret}")
    private String client_secret;

    public ResumeService(ResumeRepository resumeRepository, NcpObjectStorageService storageService, ResumeCareerRepository resumeCareerRepository, ResumeLicenseRepository resumeLicenseRepository, JwtService jwtService) {
        this.resumeRepository = resumeRepository;
        this.storageService = storageService;
        this.resumeCareerRepository = resumeCareerRepository;
        this.resumeLicenseRepository = resumeLicenseRepository;
        this.jwtService = jwtService;
    }

    public String insertResume(ResumeDto dto, List<ResumeCareerDto> resumeCareerDtoList, List<ResumeLicenseDto> resumeLicenseDtoList ,HttpSession session) {
        ResumeEntity entity = new ResumeEntity();

        String file = (String) session.getAttribute("file");
        if(file != null) {
            dto.setR_file(file);
        }

        String reFile = (String) session.getAttribute("refile");
        if(reFile != null) {
            dto.setR_reffile(reFile);
        }

        resumeRepository.save(entity.toResumeEntity(dto));
        log.info("이력서 기본정보 등록 완료.");

        for(ResumeCareerDto careerDto : resumeCareerDtoList) {
            ResumeCareerEntity resumeCareerEntity = new ResumeCareerEntity().toResumeCareerEntity(careerDto);
            resumeCareerRepository.save(resumeCareerEntity);
        }
        log.info("이력서 경력 등록완료.");

        for(ResumeLicenseDto licenseDto : resumeLicenseDtoList) {
             ResumeLicenseEntity resumeLicenseEntity = new ResumeLicenseEntity().toResumeLicenseEntity(licenseDto);
            resumeLicenseRepository.save(resumeLicenseEntity);
        }
        log.info("이력서 자격증 등록완료.");

        session.removeAttribute("file");
        session.removeAttribute("refile");
        log.info("이력서 최종 등록완료.");

        return "이력서 등록완료.";
    }

    public String uploadFile(MultipartFile upload, HttpSession session) {
        String file = storageService.uploadFile(bucketName,"devster/resume/file",upload);
        if(session.getAttribute("file") != null) {
            storageService.deleteFile(bucketName,"devster/resume/file",session.getAttribute("file").toString());
        }
        session.setAttribute("file", file);
        log.info("이력서 파일 업로드 완료");

        return "이력서 파일 업로드 완료";
    }

    public String uploadReFile(MultipartFile upload, HttpSession session) {
        String reFile = storageService.uploadFile(bucketName,"devster/resume/refile",upload);
        if(session.getAttribute("refile") != null) {
            storageService.deleteFile(bucketName,"devster/resume/refile",session.getAttribute("refile").toString());
        }
        session.setAttribute("refile", reFile);
        log.info("자격증, 포트폴리오 파일 업로드 완료");

        return "자격증, 포트폴리오 파일 업로드 완료";
    }

    public ResumeWrapper getOneResume(int m_idx) {
        ResumeWrapper resumeWrapper = new ResumeWrapper();

        ResumeDto resumeDto = resumeRepository.findByMIdx(m_idx)
                .map(ResumeDto::toResumeDto)
                .orElseThrow(() -> new NoSuchElementException("No Resume found with the provided index."));
        resumeWrapper.setResumeDto(resumeDto);
        log.info("resumeDto 값 가져오기 및 삽입 완료");

        List<ResumeCareerEntity> resumeCareerEntities = resumeCareerRepository.findAllByMIdx(m_idx)
                .orElse(Collections.emptyList());  // 값이 없는 경우 빈 리스트를 반환

        List<ResumeCareerDto> resumeCareerDtoList = resumeCareerEntities.stream()
                .map(ResumeCareerDto::toResumeCareerDto)
                .collect(Collectors.toList());

        if (resumeCareerDtoList.isEmpty()) {
            throw new NoSuchElementException("No ResumeCareer found with the provided index.");
        }

        resumeWrapper.setResumeCareerDtoList(resumeCareerDtoList);
        log.info("resumeCareerDto 값 가져오기 및 삽입 완료");

        List<ResumeLicenseEntity> resumeLicenseEntities = resumeLicenseRepository.findAllByMIdx(m_idx)
                .orElse(Collections.emptyList());  // 값이 없는 경우 빈 리스트를 반환

        List<ResumeLicenseDto> resumeLicenseDtoList = resumeLicenseEntities.stream()
                .map(ResumeLicenseDto::toResumeLicenseDto)
                .collect(Collectors.toList());

        if (resumeLicenseDtoList.isEmpty()) {
            throw new NoSuchElementException("No ResumeLicense found with the provided index.");
        }

        resumeWrapper.setResumeLicenseDtoList(resumeLicenseDtoList);
        log.info("resumeLicenseDto 값 가져오기 및 삽입 완료");

        return resumeWrapper;
    }

    @Transactional
    public String deleteResume(HttpServletRequest request) {
        int m_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();

        ResumeEntity entity = resumeRepository.findByMIdx(m_idx).get();
        storageService.deleteFile(bucketName,"devster/resume/file", entity.getRFile());
        log.info("이력서 파일 삭제완료");

        storageService.deleteFile(bucketName,"devster/resume/refile", entity.getRReffile());
        log.info("자격증, 포트폴리오 파일 삭제완료");

        resumeRepository.delete(entity);
        log.info( m_idx + " 이력서 삭제완료.");

        resumeCareerRepository.deleteAllByMIdx(m_idx);
        log.info( m_idx + " 경력 사항 삭제 완료.");

        resumeLicenseRepository.deleteAllByMIdx(m_idx);
        log.info( m_idx + " 자격증 삭제 완료.");


        log.info( m_idx + " 이력서 최종 삭제 완료");

        return m_idx + " 이력서 최종 삭제 완료";
    }

    public String updateResume(ResumeDto dto, List<ResumeCareerDto> resumeCareerDtoList, List<ResumeLicenseDto> resumeLicenseDtoList ,HttpSession session) {
        // 이력서 엔티티 가져오기
        ResumeEntity entity = resumeRepository.findByMIdx(dto.getM_idx()).orElseThrow(() -> new IllegalArgumentException("해당 이력서가 없습니다. id=" + dto.getM_idx()));

        String file = (String) session.getAttribute("file");
        if(file != null) {
            storageService.deleteFile(bucketName,"devster/resume/file",entity.getRFile());
            dto.setR_file(file);
        }

        String reFile = (String) session.getAttribute("refile");
        if(reFile != null) {
            storageService.deleteFile(bucketName,"devster/resume/refile",entity.getRReffile());
            dto.setR_reffile(reFile);
        }

        // 이력서 엔티티 업데이트
        entity.updateResumeEntity(dto);
        resumeRepository.save(entity);
        log.info("이력서 기본정보 업데이트 완료.");

        for(ResumeCareerDto careerDto : resumeCareerDtoList) {
            // 경력 엔티티 가져오기
            ResumeCareerEntity resumeCareerEntity = resumeCareerRepository.findById(careerDto.getRecar_idx()).orElseThrow(() -> new IllegalArgumentException("해당 경력이 없습니다. id=" + careerDto.getRecar_idx()));

            // 경력 엔티티 업데이트
            resumeCareerEntity.updateResumeCareerEntity(careerDto);
            resumeCareerRepository.save(resumeCareerEntity);
        }
        log.info("이력서 경력 업데이트 완료.");

        for(ResumeLicenseDto licenseDto : resumeLicenseDtoList) {
            // 자격증 엔티티 가져오기
            ResumeLicenseEntity resumeLicenseEntity = resumeLicenseRepository.findById(licenseDto.getRelic_idx()).orElseThrow(() -> new IllegalArgumentException("해당 자격증이 없습니다. id=" + licenseDto.getRelic_idx()));

            // 자격증 엔티티 업데이트
            resumeLicenseEntity.updateResumeLicenseEntity(licenseDto);
            resumeLicenseRepository.save(resumeLicenseEntity);
        }
        log.info("이력서 자격증 업데이트 완료.");

        session.removeAttribute("file");
        session.removeAttribute("refile");
        log.info("이력서 최종 업데이트 완료.");

        return "이력서 업데이트 완료.";
    }

    public String translateResume(String inputText) throws IOException {
        try {
            String text = URLEncoder.encode(inputText, "UTF-8");
            String apiURL = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", client_id);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", client_secret);
            // post request
            String postParams = "source=ko&target=en&text=" + text;
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 오류 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            String responseJson = response.toString();

            JSONObject obj = new JSONObject(responseJson);
            String translatedText = obj.getJSONObject("message").getJSONObject("result").getString("translatedText");

            return translatedText;
        } catch (Exception e) {
            throw e;
        }
    }

}
