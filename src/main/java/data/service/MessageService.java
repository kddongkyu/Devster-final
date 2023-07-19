package data.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.dto.message.MessageBodyDto;
import data.dto.message.MessageRequestDto;
import data.dto.message.MessageResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Component
@Slf4j
public class MessageService {

    @Value("${naver.sens.service_id}")
    private String SERVICE_ID;

    @Value("${naver.sens.number}")
    private String NUMBER;

    @Value("${naver.sens.accessKey}")
    private String ACCESSKEY;

    @Value("${naver.sens.secretKey}")
    private String SECRETKEY;

    public String sendSms(String recipientPhoneNumber) throws JsonProcessingException, UnsupportedEncodingException, InvalidKeyException, NoSuchAlgorithmException, URISyntaxException {
        String time = Long.toString(System.currentTimeMillis());
        List<MessageBodyDto> list = new ArrayList<>();

        Random rnd = new Random();
        int number = rnd.nextInt(900000) + 100000;
        // 보내는 사람에게 내용을 보냄.
        MessageBodyDto messageBodyDto = new MessageBodyDto(recipientPhoneNumber,"[Devster] 인증번호 [" + number + "] 입니다.");
        list.add(messageBodyDto);
        // 전체 json에 대해 메시지를 만든다.
        MessageRequestDto messageRequestDto = new MessageRequestDto("SMS", "COMM", "82", NUMBER, "MangoLtd", list);

        // 쌓아온 바디를 json 형태로 변환시켜준다.
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(messageRequestDto);

        // 헤더에서 여러 설정값들을 잡아준다.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time);
        headers.set("x-ncp-iam-access-key", ACCESSKEY);

        // 제일 중요한 signature 서명하기.
        String sig = getSignature(time);
        headers.set("x-ncp-apigw-signature-v2", sig);

        // 위에서 조립한 jsonBody와 헤더를 조립한다.
        HttpEntity<String> body = new HttpEntity<>(jsonBody, headers);
        log.info(body.getBody());

        // restTemplate로 post 요청을 보낸다. 별 일 없으면 202 코드 반환된다.
        RestTemplate restTemplate = new RestTemplate();
        MessageResponseDto messageResponseDto = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+SERVICE_ID+"/messages"), body, MessageResponseDto.class);
        log.info("문자인증 https status : " + messageResponseDto.getStatusCode());
        log.info(messageResponseDto.toString());
        return Integer.toString(number);
    }

    private String getSignature(String time) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + SERVICE_ID + "/messages";

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(time)
                .append(newLine)
                .append(ACCESSKEY)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(SECRETKEY.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);

        return encodeBase64String;
    }
}