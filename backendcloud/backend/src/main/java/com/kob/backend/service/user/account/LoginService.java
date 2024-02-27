package com.kob.backend.service.user.account;

import java.util.Map;

// 在service里完成接口 ，在service的utils里完成接口的实现类，最后控制台调用接口
public interface LoginService {
    //
    public Map<String ,String > getToken(String username,String password);

}
