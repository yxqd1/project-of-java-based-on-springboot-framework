package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/pk/")
public class BotInfoController {
    //前后端分离返回数据
    @RequestMapping("getbotinfo/")
    public Map<String, String> getBotInfo() {

        Map<String, String> bot1 = new HashMap<>();
        bot1.put("name", "Li");
        bot1.put("rating", "120");

        return bot1;

    }
}
