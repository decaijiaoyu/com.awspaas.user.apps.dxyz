package controller;
import com.actionsoft.sdk.service.AppApi;
import com.actionsoft.sdk.service.response.StringResponse;
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;

import java.util.Random;

public class VerifyUtils {
    //短信发送
        public static String SendSms(String phone) {
            AppApi appApi = new AppApi();
            StringResponse regionid = appApi.getProperty("com.awspaas.user.apps.dxyz", "aliyun.regionid");
            StringResponse accessKeyId = appApi.getProperty("com.awspaas.user.apps.dxyz", "aliyun.accessKeyId");
            StringResponse accessSecret = appApi.getProperty("com.awspaas.user.apps.dxyz", "aliyun.accessSecret");
            StringResponse templateCode = appApi.getProperty("com.awspaas.user.apps.dxyz", "aliyun.templateCode");
            StringResponse signName = appApi.getProperty("com.awspaas.user.apps.dxyz", "signName");
            DefaultProfile profile = DefaultProfile.getProfile(regionid.getData(),accessKeyId.getData(),accessSecret.getData());
            IAcsClient client = new DefaultAcsClient(profile);
            String code=GetAuthCode();//获取随机验证码
            CommonRequest request = new CommonRequest();
            //request.setProtocol(ProtocolType.HTTPS);
            request.setMethod(MethodType.POST);
            request.setDomain("dysmsapi.aliyuncs.com");
            request.setVersion("2017-05-25");
            request.setAction("SendSms");
            request.putQueryParameter("RegionId", regionid.getData());
            request.putQueryParameter("PhoneNumbers", phone);
            request.putQueryParameter("SignName", signName.getData());
            request.putQueryParameter("TemplateCode", templateCode.getData());
            request.putQueryParameter("TemplateParam", "{\"kcode\":\""+code+"\"}");
            try {
                CommonResponse response = client.getCommonResponse(request);
            } catch (ServerException e) {
                e.printStackTrace();
            } catch (ClientException e) {
                e.printStackTrace();
            }
            return code;
        }

    //生成
         public static String GetAuthCode()
        {
            String verifyCode = String.valueOf(new Random().nextInt(899999) + 100000);
             return verifyCode;
         }
}
