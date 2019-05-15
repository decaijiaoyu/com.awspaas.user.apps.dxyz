package plugin;

import com.actionsoft.apps.listener.PluginListener;
import com.actionsoft.apps.resource.AppContext;
import com.actionsoft.apps.resource.plugin.profile.AWSPluginProfile;
import com.actionsoft.apps.resource.plugin.profile.CachePluginProfile;

import java.util.ArrayList;
import java.util.List;
//插件注册
public class Plugins implements PluginListener {
    @Override
    public List<AWSPluginProfile> register(AppContext appContext) {
        List<AWSPluginProfile> list = new ArrayList<AWSPluginProfile>();
        list.add(new CachePluginProfile(BookCache.class));
        return list;
    }
}
