package com.kob.bankend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/pk/")
public class BotInfoController {
    //前后端分离返回数据
    @RequestMapping("getbotinfo/")
    public List<Map<String,String>> getBotInfo() {
        List<Map<String ,String >> list = new LinkedList<>();
        Map<String ,String >bot1 = new HashMap<>();
        bot1.put("name","Li");
        bot1.put("rating","120");
        Map<String ,String >bot2 = new HashMap<>();
        bot2.put("name","So");
        bot2.put("rating","220");
        list.add(bot1);
        list.add(bot2);
        return list;

    }
}
