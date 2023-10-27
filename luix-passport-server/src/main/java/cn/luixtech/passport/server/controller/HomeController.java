package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.utils.AuthUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static cn.luixtech.passport.server.service.AuthorityService.DEVELOPER;

@Controller
public class HomeController {
    @RequestMapping(value = {"/", "/index"})
    public String index(Model model) {
        model.addAttribute("username", AuthUtils.getCurrentUsername());
        model.addAttribute("swaggerEnabled", AuthUtils.isAuthenticated() ? AuthUtils.hasAuthority(DEVELOPER) : false);
        return "index";
    }
}
