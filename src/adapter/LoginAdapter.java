package adapter;

import com.actionsoft.bpms.bo.engine.BO;
import com.actionsoft.bpms.commons.login.LoginAdapterInterface;
import com.actionsoft.bpms.commons.login.constant.LoginConst;
import com.actionsoft.bpms.commons.login.control.LoginContext;
import com.actionsoft.bpms.commons.login.control.LoginResult;
import com.actionsoft.bpms.server.conf.portal.AWSPortalConf;
import com.actionsoft.bpms.util.DBSql;
import plugin.BookCache;

import java.util.Map;

/**
 * 默认本地用户名+口令验证
 *
 */
public class LoginAdapter implements LoginAdapterInterface {

    /**
     * 依据Context获取登录信息，进行登录检验
     *
     * @return 返回校验结果
     */
    public LoginResult validate(LoginContext context) {
        //首先构造一个登录结果对象
        LoginResult lr = new LoginResult();
        Map<String, Object> params = context.getParams();
        String code = BookCache.getCache().get("code");
        String phoneNum = (String)params.get("phoneNum");
        String checkCode=(String)params.get("checkCode");
        if(code!=null&& checkCode!=null && code.equals(checkCode)){
            String sql = "SELECT userid FROM orguser WHERE OFFICETEL = ?";
            String userid = DBSql.getString(sql, new Object[] { phoneNum });
            //BO bo=SDK.getBOAPI().query("select userid from orguser").addQuery("officetel=",phoneNum).detail();
            BookCache.getCache().remove("code");
            //最后设置登录UID，
            lr.setLocalUID(userid);
            //设置登录的结果
            lr.setStatus(LoginConst.LOGIN_STATUS_OK);
            //如果登录失败，可将自定义的消息写入下面的方法，前端界面会展示该信息
            lr.setMsg("消息内容");
        }else if(context.getUid()!=null && context.getMD5Pwd()!=null){
            String sql = "SELECT userid FROM orguser WHERE userid =? and password = ?";
            String userid = DBSql.getString(sql, new Object[] { context.getUid(),context.getMD5Pwd() });
            if(userid!=null && userid!=""){
                //最后设置登录UID，
                lr.setLocalUID(userid);
                //设置登录的结果
                lr.setStatus(LoginConst.LOGIN_STATUS_OK);
                //如果登录失败，可将自定义的消息写入下面的方法，前端界面会展示该信息
                lr.setMsg("消息内容");
            }else{
                lr.setStatus(LoginConst.LOGIN_STATUS_ERR1);
            }
        }else{
            lr.setLocalUID(context.getUid());
            //设置登录的结果
            lr.setStatus(LoginConst.LOGIN_STATUS_OK);
            //如果登录失败，可将自定义的消息写入下面的方法，前端界面会展示该信息
            lr.setMsg("消息内容");
        }
        //针对具体业务要求，实现相关代码
        //.确定uid
        String contextUid=context.getUid();
        if(AWSPortalConf.isNTLM()){
            contextUid=contextUid.substring(contextUid.lastIndexOf("\\")+1);
        }
        return lr;
    }

}
