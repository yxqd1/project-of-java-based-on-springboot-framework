package com.kob.bankend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pk/")
public class IndexController {
    @RequestMapping("index/")
    public  String index(){
        //前后端不分离，返回文件
        return "pk/index.html";
    }
}
