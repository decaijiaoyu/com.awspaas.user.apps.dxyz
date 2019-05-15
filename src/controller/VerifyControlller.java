package controller;

import com.actionsoft.bpms.bo.engine.BO;
import com.actionsoft.bpms.server.bind.annotation.Mapping;
import com.actionsoft.bpms.util.DBSql;
import com.actionsoft.sdk.local.SDK;
import org.apache.tools.ant.types.Mapper;
import com.actionsoft.bpms.server.bind.annotation.Controller;
import org.redisson.misc.Hash;
import com.alibaba.fastjson.JSONObject;
import plugin.BookCache;

import javax.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.util.HashMap;
import java.util.List;

//短信验证
@Controller
public class VerifyControlller {
    //获取验证码
    @Mapping(value="com.awspaas.user.apps.dxyz_login",session=false, noSessionReason="手机验证登陆，无需sid", noSessionEvaluate="手机验证登陆，无需sid")
    public JSONObject getverify(HttpServletRequest request, String phoneNumber){
        JSONObject jsonObject = new JSONObject();
        String orguser="orguser";
        String sql = "SELECT ID FROM orguser WHERE OFFICETEL = ?";
        String id = DBSql.getString(sql, new Object[] { phoneNumber });
        //List<BO> ckdmx= SDK.getBOAPI().query(orguser).addQuery("OFFICETEL = ",phoneNumber).list();
        if(id !=null && id!=""){
            String code=VerifyUtils.SendSms(phoneNumber);//发送验证码

            BookCache.getCache().put("code",code);
            //request.getSession().setAttribute("code",code);
            jsonObject.put("flag",1);//发生完成
        }else{
            jsonObject.put("flag",2);//发送失败
        }
        return jsonObject;
    }
    //移除过期验证
    @Mapping(value="com.awspaas.user.apps.dxyz_reset" ,session =false,noSessionReason = "重置验证码", noSessionEvaluate="重置验证码")
    public void resetverify(HttpServletRequest request){
        BookCache.getCache().remove("code");
    }

}
