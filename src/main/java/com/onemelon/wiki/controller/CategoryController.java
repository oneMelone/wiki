package com.onemelon.wiki.controller;

import com.onemelon.wiki.req.CategoryQueryReq;
import com.onemelon.wiki.req.CategorySaveReq;
import com.onemelon.wiki.resp.CommonResp;
import com.onemelon.wiki.resp.CategoryQueryResp;
import com.onemelon.wiki.resp.PageResp;
import com.onemelon.wiki.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Resource
    private CategoryService categoryService;

    // Controller层不要见到实体Category。
    @GetMapping("/list")
    public CommonResp<PageResp<CategoryQueryResp>> list(@Valid CategoryQueryReq req) {
        CommonResp<PageResp<CategoryQueryResp>> resp = new CommonResp<>();
        PageResp<CategoryQueryResp> list =  categoryService.list(req);
        resp.setContent(list);
        return resp;
    }

    @PostMapping("/save")
    public CommonResp save(@Valid @RequestBody CategorySaveReq req) {
        CommonResp resp = new CommonResp<>();
        categoryService.save(req);
        return resp;
    }

    @DeleteMapping("/delete/{id}")
    public CommonResp delete(@PathVariable Long id) {
        CommonResp resp = new CommonResp<>();
        categoryService.delete(id);
        return resp;
    }
}
