package com.luixtech.sso.server.controller;

import com.luixtech.sso.starter.utils.AuthUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @ModelAttribute(name = "subject")
    public Subject subject() {
        return SecurityUtils.getSubject();
    }

    @RequestMapping(value = {"", "/"})
    public String index(Model model) {
        model.addAttribute("name", AuthUtils.getCurrentUsername());
        model.addAttribute("isAdmin", AuthUtils.hasRole("ROLE_ADMIN"));
//        boolean hasPermission = AuthUtils.hasPermission("user:insert");
        return "index";
    }
}
