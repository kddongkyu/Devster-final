package data.service;

import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService{

    @Autowired
    JavaMailSender emailSender;

    public String ePw;

    private MimeMessage createMessage(String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+(ePw=createKey()));
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("이메일 인증 테스트");//제목

        String msgg="";
        msgg+= "<div style='margin:20px; width:555px; height:800px; background: white; border: 10px #721EA6 solid; position: relative; text-align : center'>";

// 로고
        msgg+= "<div style='width: 202px; height: 145px; left: 299px; top: 127px; position: absolute; background: #721EA6'>";
        msgg+= "<div style='width: 175.07px; height: 118.64px; left: 13.47px; top: 13.18px; position: absolute; background: white'></div>";
        msgg+= "</div>";

// 메세지
        msgg+= "<div style='width: 555px; height: 160px; left: 121px; top: 351px; position: absolute; text-align: center'>";
        msgg+= "<span style='color: black; font-size: 30px; font-family: Inter; font-weight: 700; word-wrap: break-word'>Devster<br/></span>";
        msgg+= "<span style='color: black; font-size: 20px; font-family: Inter; font-weight: 700; word-wrap: break-word'>환영합니다! </span>";
        msgg+= "<span style='color: #721EA6; font-size: 20px; font-family: Inter; font-weight: 700; word-wrap: break-word'>이메일 주소</span>";
        msgg+= "<span style='color: black; font-size: 20px; font-family: Inter; font-weight: 700; word-wrap: break-word'>를 인증해 주세요.<br/><br/>해당 인증번호를 인증번호 입력창에 입력해주세요!<br/><br/><br/></span>";
        msgg+= "</div>";

// 인증코드
        msgg+= "<div style='width: 451px; height: 140px; left: 175px; top: 577px; position: absolute; background: #721EA6'>";
        msgg+= "<div style='width: 391px; left: 205px; top: 610px; position: absolute; text-align: center; color: white; font-size: 60px; font-family: Inter; font-weight: 700; word-wrap: break-word'>";
        msgg+= ePw;
        msgg+= "</div>";
        msgg+= "</div>";

        msgg+= "</div>";

        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("devstermailservice@gmail.com","Devster"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }
    public String sendSimpleMessage(String to)throws Exception {
        MimeMessage message = createMessage(to);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }
}