package com.licc.dove.security;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import java.util.Map;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.licc.dove.domain.User;
import com.licc.dove.service.UserService;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.AbstractHandlerMethodMapping;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;


/**
 * @author Jonsy
 *
 */
@Service
public class UserDetailService implements UserDetailsService {
    @Resource
    ApplicationContext applicationContext;
    @Autowired
    protected UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userService.getByUserName(username);
        if(user==null){
            throw new BadCredentialsException("用户名或密码错误");
        }
        List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();

        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        List<MethodAuthority> methodAuthorities = getMethodAuthoritys();
        return new org.springframework.security.core.userdetails.User(user.getUserName(),user.getPassword(), Collections
            .emptyList());
    }



    /**
     * 获取所有方法信息
     *
     * @return
     */
    public  List<MethodAuthority> getMethodAuthoritys(){
        AbstractHandlerMethodMapping<RequestMappingInfo> objHandlerMethodMapping = (AbstractHandlerMethodMapping<RequestMappingInfo>) applicationContext
            .getBean("requestMappingHandlerMapping");
        Map<RequestMappingInfo, HandlerMethod> mapRet = objHandlerMethodMapping.getHandlerMethods();
        List<MethodAuthority> methodAuthorities =  new ArrayList<>();
        for (RequestMappingInfo mapping : mapRet.keySet()) {
            String url = mapping.getPatternsCondition().getPatterns().iterator().next();
            MethodAuthority methodAuthority = new MethodAuthority(url);
            methodAuthorities.add(methodAuthority);
        }
        return methodAuthorities;

    }


}
