package com.onemelon.wiki.controller;

import com.onemelon.wiki.req.DocQueryReq;
import com.onemelon.wiki.req.DocSaveReq;
import com.onemelon.wiki.resp.CommonResp;
import com.onemelon.wiki.resp.DocQueryResp;
import com.onemelon.wiki.resp.PageResp;
import com.onemelon.wiki.service.DocService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/doc")
public class DocController {

    @Resource
    private DocService docService;

    // Controller层不要见到实体Doc。
    @GetMapping("/list")
    public CommonResp<PageResp<DocQueryResp>> list(@Valid DocQueryReq req) {
        CommonResp<PageResp<DocQueryResp>> resp = new CommonResp<>();
        PageResp<DocQueryResp> list =  docService.list(req);
        resp.setContent(list);
        return resp;
    }

    @PostMapping("/save")
    public CommonResp save(@Valid @RequestBody DocSaveReq req) {
        CommonResp resp = new CommonResp<>();
        docService.save(req);
        return resp;
    }

    @DeleteMapping("/delete/{idsStr}")
    public CommonResp delete(@PathVariable String idsStr) {
        CommonResp resp = new CommonResp<>();
        List<String> list = Arrays.asList(idsStr.split(","));
        docService.delete(list);
        return resp;
    }
}
