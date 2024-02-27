package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

@Service
public class RegisterServiceImpl implements RegiserService {
//    接口的实现类，要具体实现各种逻辑
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String ,String >map = new HashMap<>();
        if(username == null){
            map.put("error_message","用户名不能为空");
            return map;
        }
        if(password == null ||confirmedPassword == null){
            map.put("error_message","密码不能为空");
            return map;
        }
//        去除用户名前后空格，再进行判断
        username = username.trim();
        if(username.length()==0){
            map.put("error_message","用户名不能为空");
            return map;
        }
        if(password.length()==0||confirmedPassword.length()==0){
            map.put("error_message","密码不能为空");
            return map;
        }
        if(username.length()>100){
            map.put("error_message","用户名不要超过100");
            return map;
        }
        if(password.length()>100 || confirmedPassword.length()>100){
            map.put("error_message","密码不要超过100");
            return map;
        }
        if(!password.equals(confirmedPassword)){
            map.put("error_message","两次输入密码不一致");
            return map;
        }
//        验证用户名是否一致，3行比较固定   将筛选内容提取到users里面
        QueryWrapper<User>queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<User> users = userMapper.selectList(queryWrapper);

        if(!users.isEmpty()){
            map.put("error_message", "用户名已存在");
            return map;
        }
//        正式向数据库写入加密后的数据
        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://cdn.acwing.com/media/user/profile/photo/1_lg_844c66b332.jpg";
        User user = new User(null,username,encodedPassword,photo,1500);
        userMapper.insert(user);

        map.put("error_message","success");

        return map;
    }
}
