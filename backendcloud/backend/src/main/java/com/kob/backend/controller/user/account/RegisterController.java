package com.kob.backend.controller.user.account;

import com.kob.backend.service.user.account.RegiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RegisterController {
    @Autowired
    private RegiserService regiserService;

    @PostMapping("/user/account/register/")
    public Map<String ,String > register(@RequestParam Map<String ,String >map){
        String username = map.get("username");
        String password = map.get("password");
        String confirmedPassword = map.get("confirmedPassword");
        return regiserService.register(username,password,confirmedPassword);
    }
}
