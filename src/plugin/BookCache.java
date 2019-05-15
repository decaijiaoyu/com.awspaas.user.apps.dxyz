package plugin;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

import com.actionsoft.apps.resource.plugin.profile.CachePluginProfile;
import com.actionsoft.bpms.commons.cache.Cache;
import com.actionsoft.bpms.commons.cache.CacheManager;

public class BookCache extends Cache<String, String> {

    public BookCache(CachePluginProfile profile) {
        super(profile);
    }
    /**
     * 让Cache使用者直接访问到内部封装的操作，如put/remove
     *
     * @return
     */
    public static BookCache getCache() {
        return CacheManager.getCache(BookCache.class);
    }
    /**
     * 初始化缓存。通常这里从DAO或其他持久数据中完成初始化过程
     */
    protected void load() {
        // 模拟一个持久层数据结构
            // 放入本地缓存
      put("cs","151");
    }
}
