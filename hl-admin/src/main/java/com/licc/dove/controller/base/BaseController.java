package com.licc.dove.controller.base;

import org.springframework.util.StringUtils;

import com.licc.dove.dao.Page;
import com.licc.dove.util.ResponseVo;
import com.licc.dove.util.ResponseVoUtil;

/**
 *
 * @author lichangchao
 * @version 1.0.0
 * @date 2017/12/25 17:36
 * @see
 */

public class BaseController {

  public  <T> ResponseVo result(Page<T> page,String draw)  {
    if(StringUtils.isEmpty(draw)) draw = "0";
    return  ResponseVoUtil.successData(page).setDraw(Integer.parseInt(draw));
  }
}
