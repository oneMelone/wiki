package com.onemelon.wiki.controller;

import com.onemelon.wiki.req.EbookReq;
import com.onemelon.wiki.resp.CommonResp;
import com.onemelon.wiki.resp.EbookResp;
import com.onemelon.wiki.resp.PageResp;
import com.onemelon.wiki.service.EbookService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/ebook")
public class EbookController {

    @Resource
    private EbookService ebookService;

    // Controller层不要见到实体Ebook。
    @GetMapping("/list")
    public CommonResp<PageResp<EbookResp>> list(EbookReq req) {
        CommonResp<PageResp<EbookResp>> resp = new CommonResp<>();
        PageResp<EbookResp> list =  ebookService.list(req);
        resp.setContent(list);
        return resp;
    }
}
