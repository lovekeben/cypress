//<reference types="Cypress" />
describe("深圳agency", function () {

    const username = 'szautotest001'
    const password = '123456ly'
    const url = 'http://szagency.centaline.com.cn'

    beforeEach("登录", function () {
        cy.visit(url) //打开深圳A+网址
        cy.title().should('contain', '用户登录') //判断是否打开（打开正确，标题包含‘用户登录’字样）
        cy.get('#txtUserName') //获取用户名输入框
            .click()
            .type(username)   //输入用户名
            .should('have.value', 'szautotest001')  //判断用户名输入是否正确
            .click()
            .click()
        cy.wait(500)
        cy.get('.ac_results')   //获取用名户下拉框
            .should('have.class', 'ac_results')   //判断下拉框是否显示
            .click()
        cy.get('#txtPassword')  //获取密码输入框
            .type(password)   //输入密码
            .wait(500)
        cy.get('.btn-org')  //获取登录按钮
            .should('contain', '登录')   //判断登录框是否显示
            .click()   //提交登录
        cy.wait(1000)
        // cy.get('#sysTitle')
        //     .click()
        // cy.get('#btnVersionClose')
        //     .click()
        // cy.wait(1000)

    })

    //登录
    it.skip("登录", function () {
        cy.visit(url) //打开深圳A+网址
        cy.title().should('contain', '用户登录') //判断是否打开（打开正确，标题包含‘用户登录’字样）
        cy.get('#txtUserName') //获取用户名输入框
            .wait(500)
            .click()
            .type(username)   //输入用户名
            .should('have.value', 'szautotest001')  //判断用户名输入是否正确
        cy.get('.ac_results')   //获取用名户下拉框
            .wait(500)
            .should('have.class', 'ac_results')   //判断下拉框是否显示
            .click()
        cy.get('#txtPassword')  //获取密码输入框
            .type(password)   //输入密码
        cy.get('.btn-org')  //获取登录按钮
            .should('contain', '登录')   //判断登录框是否显示
            .click()   //提交登录

    })

    //房源搜索
    it('房源搜索', function () {
        //点击更多操作选择
        cy.get('#moresel')
            .click()
        cy.get('#liPictureText')
            .should('exist')
            .click()
        //判断是否有数据，如果有数据，则取第一条数据的房源编号搜索。如果没有数据，则切换到临深盘，并搜索第一条数据的房源编号。 
        cy.get('#ajaxPages').then(() => {
            let el = Cypress.$('#imgTextList')
            //cy.log(el.length)
            if (el.length > 0) {
                cy.get('#cmbFilterType')
                    .wait(500)
                    .should('be.visible')
                    .select('2')
                    .should('contain', '房源编号')
                    cy.get(':nth-child(2) > :nth-child(1) > .clearfix > .td-div > .w172 > .l').then(($aaa) => {
                    const btnTxt = $aaa.text()
                    cy.get('#txtFilter')
                        .type(btnTxt)
                })
            } else {
                cy.get('[code="30"]')
                    .click()
                cy.get('#cmbFilterType')
                    .wait(500)
                    .should('be.visible')
                    .select('2')
                    .should('contain', '房源编号')
                cy.get('#gdWarZoneList > tbody:nth-child(2) > tr:nth-child(1) > td > div > span.l.ml20.font-arial.f12.w150.tl > a').then(($aaa) => {
                    const btnTxt = $aaa.text()
                    cy.get('#txtFilter')
                        .type(btnTxt)
                })

            }
        })
        cy.get('#btnSubmit')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(1000)
            cy.get('#gdWarZoneList').should('exist') //判断查找数据显示正常
        })
    })

    //列表模式
    it('列表模式选择', function () {
        cy.get('[code="30"]')
            .click()
        //判断存在并点击图文模式
        cy.get('#liPictureText')
            .should('exist')
            .click()

        cy.get('#ajaxPages').then(() => {
            cy.wait(1000)
            cy.get('#gdWarZoneList').should('exist') //图文模式数据显示正常
        })
        //判断存在并点击列表模式
        cy.get('#liTable')
            .should('exist')
            .click()

        cy.get('#ajaxPages').then(() => {
            cy.wait(1000)
            cy.get('#gdWarZoneList').should('exist') //判断列表模式数据显示正常
        })
        //判断存在并点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()

        cy.get('#ajaxPages').then(() => {
            cy.wait(1000)
            cy.get('#gdWarZoneList').should('exist') //判断简洁模式数据显示正常
        })
    })

    //通盘房源二级导航
    it("通盘房源二级导航", function () {
        cy.get('#war-zone')  //获取通盘房源左导
            .should('be.visible') //判断通盘房源左导是否显示
        cy.get('#districtType') //获取二级导航
        //cy.wait(1000) //等待1秒
        cy.get('[code="10"]')
            .should('contain', '二手盘') //判断是否包含二手盘
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断二手盘数据显示正常
        })
        cy.get('[code="60"]')
            .should('contain', '商住盘')  //判断是否包含商住盘
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断商住盘数据显示正常
        })
        cy.get('[code="20"]')
            .should('contain', '一手盘')  //判断是否包含一手盘
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断一手盘数据显示正常
        })
        cy.get('[code="30"]')
            .should('contain', '临深盘')  //判断是否包含临深盘
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断临深盘数据显示正常
        })
        cy.get('[code="40"]')
            .should('contain', '上数盘')  //判断是否包含上述盘
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断上述盘数据显示正常
        })
        cy.get('[code="50"]')
            .should('contain', '数据盘')  //判断是否包含数据盘
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断数据盘数据显示正常
        })
    })

    //默认通盘房源
    it('通盘房源左导', function () {
        cy.get('#war-zone')
            .should('exist')
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断通盘房源左导数据显示正常
        })
    })

    //推荐房源
    it('推荐房源左导', function () {
        cy.get('#area-manager-recommend')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断推荐房源左导数据显示正常
        })
    })

    //公盘池左导
    it('公盘池左导', function () {
        cy.get('#public-estate')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断公盘池左导数据显示正常
        })
    })

    //房源贡献
    it('房源贡献左导', function () {
        cy.get('#my-sharing')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断房源贡献二手盘数据显示正常

            cy.get('[code="60"]')
                .should('contain', '钥匙')
                .click()
            cy.get('#ajaxPages').then(() => {
                cy.wait(2000)
                cy.get('#gdWarZoneList').should('exist') //房源贡献钥匙TAB数据显示正常
            })

            cy.get('[code="20"]')
                .should('contain', '实勘')
                .click()
            cy.get('#ajaxPages').then(() => {
                cy.wait(2000)
                cy.get('#gdWarZoneList').should('exist') //房源贡献实勘TAB数据显示正常
            })

            cy.get('[code="30"]')
                .should('contain', '委托')
                .click()
            cy.get('#ajaxPages').then(() => {
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist') //房源贡献委托TAB数据显示正常
            })

            cy.get('[code="40"]')
                .should('contain', '签约')
                .click()
            cy.get('#ajaxPages').then(() => {
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist') //房源贡献签约TAB数据显示正常
            })
        })
    })

    //我的收藏
    it('我的收藏左导', function () {
        cy.get('#my-favorite')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#divTableContent').should('exist') //判断我的收藏左导数据显示正常
        })
    })

    //我的推荐
    it('我的推荐左导', function () {
        cy.get('#my-recommend')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#divTableContent').should('exist') //判断我的推荐左导数据显示正常
        })
    })

    //跟进记录
    it('跟进记录左导', function () {
        cy.get('#follow')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断我的跟进左导数据显示正常
        })
    })

    //我的转介
    it('我的转介左导', function () {
        cy.get('#my-referral')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断我的转介左导数据显示正常
        })
    })

    //钥匙管理
    it('钥匙管理', function () {
        cy.get('#key')
            .should('exist')
            .click()
        cy.get('#btnSubmit')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断钥匙管理左导数据显示正常
        })
    })

    //叫价记录
    it('叫价记录左导', function () {
        cy.get('#call-price')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断叫价记录左导数据显示正常
        })
    })

    //通话记录
    it('通话记录左导', function () {
        cy.get('#call-log')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断通话记录左导数据显示正常
        })
    })

    //实勘审核
    it('实勘审核左导', function () {
        cy.get('#realsurveys')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断实勘审核左导数据显示正常
        })
    })

    //业主委托审核
    it('业主委托审核左导', function () {
        cy.get('#registertrusts')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断业主委托审核左导数据显示正常
        })
    })

    //电子委托
    it('电子委托左导', function () {
        cy.get('#contractmanager')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断电子委托左导数据显示正常
        })
    })

    //全景管理
    it('全景管理左导', function () {
        cy.get('#panoramas')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#treeTable').should('exist') //判断全景管理左导数据显示正常
        })
    })

    //房源举报
    it('房源举报左导', function () {
        cy.get('#report')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断房源举报左导数据显示正常
        })
    })

    //开盘审核
    it('开盘审核左导', function () {
        cy.get('#openman')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#treeTable').should('exist') //判断开盘审核左导数据显示正常
        })
    })

    //快捷筛选委托已审
    it('快捷筛选委托已审', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中委托已审
                    .check('7')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选实勘复审
    it('快捷筛选实勘复审', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中实勘复审
                    .check('6')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选政府编号
    it('快捷筛选政府编号', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中政府编号
                    .check('5')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选钥匙
    it('快捷筛选钥匙', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中钥匙
                    .check('41627301-aaac-4202-aed8-3e4afd9954c8')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选VR看房
    it('快捷筛选VR看房', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中VR看房
                    .check('HasVR')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选推荐房
    it('快捷筛选推荐房', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中推荐房
                    .check('3')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选独家已审
    it('快捷筛选独家已审', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中独家已审
                    .check('10')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选72小时新增房
    it('快捷筛选72小时新增房', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中72小时新增房
                    .check('1fef55e1-9b31-44af-a3db-16fcb4ff0f13')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选急售房
    it('快捷筛选急售房', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中急售房
                    .check('37424ab4-d4ba-49a5-af9a-0b2aa5976afb')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选满两年
    it('快捷筛选满两年', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中满两年
                    .check('ae78e16d-f0a2-4795-a279-d9e82072f516')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    it('快捷筛选30天租约到期', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中30天租约到期
                    .check('719a8138-289d-4d75-bb02-5ab4f60c5627')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选满五年
    it('快捷筛选满五年', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(1000)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(1000)
                cy.get('[type="checkbox"]') //选中满五年
                    .check('ac2b0472-0ca0-c3f5-79fd-08d5b623baa0')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选官网未发布
    it('快捷筛选官网未发布', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中官网未发布
                    .check('IsProAds')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选唯一
    it('快捷筛选唯一', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中唯一
                    .check('2a54982a-9b4f-4adc-9bc9-411436e76d16')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选免扰房
    it('快捷筛选免扰房', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中免扰房
                    .check('2')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选官网已发布
    it('快捷筛选官网已发布', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中官网已发布
                    .check('IsAlreadyProAds')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选视频房源
    it('快捷筛选视频房源', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中视频房源
                    .check('IsVideo')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选凶宅
    it('快捷筛选凶宅', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中凶宅
                    .check('72f50f0d-7b5b-c7a1-ae3e-08d41a546c54')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选签约
    it('快捷筛选签约', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中签约
                    .check('6a4ed795-3c47-4e69-a4db-5a903d1f3d3c')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选贷款未清
    it('快捷筛选贷款未清', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中贷款未清
                    .check('d9d2d154-3097-4dc1-9775-75e2e81e1c9d')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选行家成交
    it('快捷筛选行家成交', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中行家成交(公司)
                    .check('1a555a71-020f-c79d-bb6d-08d84feea3f5')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //快捷筛选限售
    it('快捷筛选限售', function () {
        //点击简洁模式
        cy.get('#liTableSimple')
            .should('exist')
            .click()
        cy.wait(2000)
        //判断简洁模式数据显示正常
        cy.get('#ajaxPages').then(() => {
            cy.wait(500)
            cy.get('#gdWarZoneList').should('exist')
        })
        //
        cy.get('#propertyboolTag')
            .should('be.visible')
            .then(function () {
                cy.wait(500)
                cy.get('[type="checkbox"]') //选中限售
                    .check('3851e54d-df86-45a4-9d3d-3319bba70d7a')
                    .should('be.checked')
                cy.wait(10000)
                cy.get('#gdWarZoneList').should('exist')
            })
    })

    //新增房源
    it('新增房源', function () {
        cy.visit(url + '/property/property-add')
        cy.get('#txtEstateName') //输入楼盘名称
            .type('TESTabc')
            .then(function () {
                cy.wait(1000)
                cy.get('.ac_results') //下拉选中楼盘名称
                    .click()
                    .should('contain', 'TESTabc')
            })
        cy.get('#txtBuildingName')//输入栋座
            .type('AAA')
            .click()
        cy.wait(1000)
            .then(() => {
                cy.get('.ac_results') //下拉选中栋座
                    .wait(500)
                    .should('have.class', 'ac_results')
                    .last()
                    .click()
            })
        cy.get('#txtHouseNo') //输入房间号
            .type('0101')
            .should('have.value', '0101')
        cy.get('#frameInfo')
            .click()
        cy.get('#txtFloorVal') //输入楼层
            .type('1')
            .should('have.value', '1')
        cy.get('#btnNextOperate') //点击下一步
            .should('be.visible')
            .click()
        cy.get('#CountF') //选中几房
            .should('be.visible')
            .select('3')
        cy.get('#CountT')  //选中几厅
            .should('be.visible')
            .select('1')
        cy.get('#CountW')  //选中几卫
            .should('be.visible')
            .select('1')
        cy.get('#CountY') //选中几阳台
            .should('be.visible')
            .select('1')
        cy.get('#Squaretxt') //输入面积
            .should('be.visible')
            .type('130')
            .should('have.value', '130')
        cy.get('#HouseDirectionKeyId') //选中朝向：东
            .should('be.visible')
            .select('9843c331-78f4-419c-8f2c-1d3166322bee')
        cy.get('#selPropertyRightNatureKeyId') //选中产权性质：完全产权
            .should('be.visible')
            .select('c262ccfa-745b-4ad7-8688-2e33748e2d91')
        cy.get('[type="checkbox"]') //选中满五
            .check('ac2b0472-0ca0-c3f5-79fd-08d5b623baa0')
            .should('be.checked')
        cy.get('[type="checkbox"]') //选中唯一
            .check('2a54982a-9b4f-4adc-9bc9-411436e76d16')
            .should('be.checked')
        cy.get('[type="checkbox"]')  //选中客厅朝南
            .check('4a9f2ab6-1270-453c-b090-0f4ff79c5dd2')
            .should('be.checked')
        cy.get('[type="checkbox"]') //选中两房朝南
            .check('e12ec7d3-8edc-45df-bb93-d37c958915ef')
            .should('be.checked')
        cy.get('#Trustordiv > .info-list > .form-controls > :nth-child(2) > .ipt')//输入联系人
            .type('zhangsan')
            .should('have.value', 'zhangsan')
        cy.get('[name=TrustorGenderKeyId]')
            .first()
            .select('000f677d-bfb1-489a-81a8-fa443236e55c')
        cy.get('.w120')
            .type('17746572340')
            .should('have.value', '17746572340')
        cy.get('#saleTrustTmp > :nth-child(1) > :nth-child(1) > .ipt')//输入售价
            .type('500')
            .should('have.value', '500')
        cy.get('[type="radio"]') //选中来源：来电
            .check('089b509b-142f-477a-88cb-90ce898db835', { force: true })
            .should('be.checked')
        cy.get('#divMainSubContent > div:nth-child(4) > div > div:nth-child(3) > input')
            .type('zfbh0101')
            .should('have.value', 'zfbh0101')
        cy.get('#infosafe')
            .click()
        cy.get('.aui_state_highlight') //确定提交
            .should('contain', '确定')
            .click()
        //取房源keyID的链接地址并设置为变量
        cy.get('#seeInfoLink').then(($infoLink) => {
            const detailsKeyID = $infoLink.attr('href')
            Cypress.env({
                detailsLink: url + detailsKeyID
            })
            cy.log(Cypress.env())
        })

    })

    //房源详情页新增跟进
    it('房源详情页新增跟进', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)

        cy.get('#INFOSUPPLYdivTextarea') //输入跟进内容
            .type('测试新增跟进')
            .should('have.value', '测试新增跟进')

        cy.get('#INFOSUPPLYdiv > .tc > .btn-lg-red')//提交跟进
            .should('contain', '提交')
            .click()

        cy.get('.aui_state_highlight')
            .should('contain', '确定')
            .click()
    })

    //房源详情页转盘
    it('房源详情页转盘', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        cy.get('#operatePanel')
            .trigger('mouseover')
            .then(function () {
                cy.wait(500)
                cy.get('#btnTurnShiefRight')  //点击转盘
                    .should('contain', '转盘')
                    .click()
                cy.get('#txtTurnEmployeeName') //输入接收盘源的人
                    .type('szautotest001')
                    .should('have.value', 'szautotest001')
                    .click()
                    .then(function () {
                        cy.get('.ac_results')   //获取用名户下拉框
                            .should('have.class', 'ac_results')   //判断下拉框是否显示
                            .click()
                    })
                cy.get('#TRUN2divTextarea') //输入跟进
                    .type('转盘给自己')
                    .should('have.value', '转盘给自己')
                cy.get('#btnTurnSubmit')
                    .should('have.value', '提交')
                    .click()
                    .then(function () {
                        cy.wait(500)
                        cy.get('.aui_state_highlight')
                            .should('contain', '确定')
                            .click()
                        cy.get('.aui_state_highlight')
                            .should('contain', '确定')
                            .click()
                    })
            })
    })

    //房源详情页编辑房源信息
    it('房源详情页编辑房源信息', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        //替换URL
        var editUrl = detailsUrlLink.replace('details', 'property-edit')
        //访问编辑房源URL
        cy.visit(editUrl)
        cy.get('#saleTrustTmp > :nth-child(1) > :nth-child(1) > .ipt')//输入售价
            .clear()
            .type('600')
            .should('have.value', '600')
        //字段未修改，直接提交
        cy.get('#infosafe')
            .scrollIntoView()
            .should('contain', '提交')
            .click()
        //确定
        cy.get('.aui_state_highlight')
            .should('contain', '确定')
            .click()
            .wait(500)
        //查看本房源
        cy.get('#seeInfoLink')
            .click()
        cy.wait(2000)
        cy.get('#require > ul > li.rel.clearfix > em')
            .should('contain', '600')
    })

    //房源列表页快捷收藏
    it('房源列表页快捷收藏', function () {
        cy.get('[code="30"]')
            .should('contain', '临深盘')  //判断是否包含临深盘
            .click()
        //判断存在并点击图文模式
        cy.get('#liPictureText')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断临深盘数据显示正常
            cy.get('#txtEstateNames') //输入楼盘名称
                .type('TESTabc')
            cy.get('.ac_results') //下拉选中楼盘名称
                .wait(1000)
                .first()
                .click()
                .should('contain', 'TESTabc')
            cy.get('#btnBuilding')//输入栋座
                .type('AAA')
                .wait(1000)
                .then(() => {
                    cy.get('.ac_results') //下拉选中栋座
                        .wait(500)
                        .should('have.class', 'ac_results')
                        .last()
                        .click({ force: true })
                })
            cy.get('#txtHouseNo') //输入房间号
                .type('0101')
                .should('have.value', '0101')
            cy.get('#btnSubmit')
                .should('have.value', '搜索')
                .click()
                .then(function () {
                    cy.wait(1000)
                    cy.get('#gdWarZoneList') //判断搜索结果
                        .should('exist')
                    cy.wait(500)
                    cy.get('.btnValues') //选中房源
                        .click()
                    cy.get('#btnFavorite')//点击收藏
                        .click()
                        .then(function () {
                            cy.wait(500)
                            cy.get('.aui_state_highlight')
                                .should('contain', '确定')
                                .click()
                        })
                })
        })
    })

    //房源列表页快捷取消收藏
    it('房源列表页快捷取消收藏', function () {
        cy.get('[code="30"]')
            .should('contain', '临深盘')  //判断是否包含临深盘
            .click()
        //判断存在并点击图文模式
        cy.get('#liPictureText')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断临深盘数据显示正常
            cy.get('#txtEstateNames') //输入楼盘名称
                .scrollIntoView()
                .type('TESTabc')
                .then(function () {
                    cy.wait(1000)
                    cy.get('.ac_results') //下拉选中楼盘名称
                        .click()
                        .should('contain', 'TESTabc')
                })
            cy.get('#btnBuilding')//输入栋座
                .type('AAA')
                .then(() => {
                    cy.wait(1000)
                    cy.get('.ac_results') //下拉选中栋座
                        .should('have.class', 'ac_results')
                        .last()
                        .click({ force: true })
                })
            cy.get('#txtHouseNo') //输入房间号
                .type('0101')
                .should('have.value', '0101')
            cy.get('#btnSubmit')
                .should('have.value', '搜索')
                .click()
                .then(function () {
                    cy.wait(1000)
                    cy.get('#gdWarZoneList') //判断搜索结果
                        .should('exist')
                        .then(function () {
                            cy.wait(2000)
                            cy.get('.btnValues') //选中房源
                                .click()
                        })
                    cy.get('#btnCancelFavorite')//点击收藏
                        .click()
                        .then(function () {
                            cy.wait(1000)
                            cy.get('.aui_state_highlight')
                                .should('contain', '确定')
                                .click()
                        })
                })
        })
    })

    //新增实勘
    it('新增实勘', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        //cy.log(detailsUrlLink)
        //将详情页链接替换为新增实勘的链接
        var realUrlLink = detailsUrlLink.replace('details', 'real')
        //cy.log(realUrlLink)
        cy.visit(realUrlLink) //打开新增实勘链接
            .title()
            .should('contain', '新增实勘')
        cy.wait(5000)
        //填写实勘点评
        cy.get('#txtRealSurveyComment')
            .type('测试实勘点评数据，请忽略')
            .should('have.value', '测试实勘点评数据，请忽略')

        //判断户型图并上传
        cy.get('#uploadRoomTypeImg')
            .should('exist')
        cy.get('input[type=file]')
            .eq(0)
            .attachFile('huxingtu.jpg', 'jpg')
            .trigger('change', { force: true })
        cy.wait(5000)
        cy.get('#RoomPhotos > .up-pic')
            .should('exist')

        //判断室内图并上传
        cy.get('#uploadRoomImg')
            .should('exist')
        cy.get('input[type=file]')
            .eq(1)
            .attachFile('keting1.jpg', 'jpg')
            .trigger('change', { force: true })
        cy.wait(5000)
        cy.get('.rel > .l')
            .should('exist')
        //判断小区图并上传
        cy.get('#uploadRoomImg2')
            .should('exist')
        cy.get('input[type=file]')
            .eq(2)
            .attachFile('xiaoqutu.jpg', 'jpg')
            .trigger('change', { force: true })
        cy.wait(5000)
        cy.get('.up-pic > img.l')
            .should('exist')

        //提交
        cy.get('#test-btn-realsafe')
            .wait(10000)
            .click()
        cy.get('#btnGoon')
            .should('contain', '确定')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#test-btn-realsurvey-review')
                    .should('have.value', '通过')
            })
    })

    //实勘审核
    it('实勘审核', function () {
        //打开实勘审核左导
        cy.get('#realsurveys')
            .should('exist')
            .click()
        cy.get('#txtEstateNames') //输入楼盘名称
            .type('TESTabc')
            .then(function () {
                cy.wait(1000)
                cy.get('.ac_results') //下拉选中楼盘名称
                    .first()
                    .click()
                    .should('contain', 'TESTabc')
            })
        cy.get('#btnBuilding')//输入栋座
            .type('AAA')
            .then(() => {
                cy.wait(1000)
                cy.get('.ac_results') //下拉选中栋座
                    .should('have.class', 'ac_results')
                    .last()
                    .click()
            })
        cy.get('#txtHouseNo') //输入房间号
            .type('0101')
            .should('have.value', '0101')

        cy.get('#realSurveyType')
            .should('be.visible')
            .select('2')

        cy.get('#btnSubmit') //搜索
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(1000)
                cy.get('#dataTable') //判断搜索结果
                    .should('exist')

                cy.get('#dataTable > tbody > tr')  //审核通过
                    .children()
                    .eq('11')
                    .should('contain', '通过')
                    .scrollIntoView()
                    .then(() => {
                        cy.get('#btn-twoappoved')
                            .click()
                        cy.get('.aui_state_highlight') //确定审核通过
                            .should('contain', '确定')
                            .click()
                            .then(function () {
                                cy.wait(500)
                                cy.get('.aui_state_highlight') //确定
                                    .should('contain', '确定')
                                    .click()
                            })
                    })
            })
    })

    //新开盘_售开租
    it('新开盘_售开租', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)

        cy.get('.w580 > :nth-child(5)') //选中新开盘
            .should('contain', '新开盘')
            .click()
        cy.get('#saleToRent > a')//售开租
            .should('contain', '售开租')
            .click()
        cy.get(':nth-child(2) > .right-width-auto > div > :nth-child(1) > input') //核对物业
            .click()
            .should('be.checked')
        cy.get('#addtrustor') //添加联系人
            .should('be.visible')
            .click()
        cy.get('#spanAddContactsModel > .contactsCount > :nth-child(1) > div.form-control > .ipt') //输入姓名
            .type('zhangsan')
            .should('have.value', 'zhangsan')
        cy.get('#spanAddContactsModel > .contactsCount > :nth-child(1) > div.form-control > .select') //选中称谓
            .select('000f677d-bfb1-489a-81a8-fa443236e55c')
            .should('have.value', '000f677d-bfb1-489a-81a8-fa443236e55c')
        cy.get('#spanAddContactsModel > .contactsCount > .checkedNumExist > :nth-child(1) > .w120') //输入手机号
            .type('13111111111')
            .should('have.value', '13111111111')
        cy.get('#rPriceSpan > :nth-child(2) > #rentPrice') //输入价格
            .type('6666')
            .should('have.value', '6666')
        cy.get('#PropertySituation > :nth-child(1)') //现状
            .click()
            .should('contain', '空房')
        cy.get('#Decoration > :nth-child(1)') //装修
            .click()
            .should('contain', '豪装')
        cy.get('#furniture > div > :nth-child(1)') //是否有家私
            .click()
            .should('contain', '是')
        cy.get('#NEWOPENINGdiv > :nth-child(12) > div > :nth-child(1)') //看房
            .click()
            .should('contain', '中原钥匙')
        cy.get(':nth-child(14) > div > :nth-child(1)') //委托书
            .click()
            .should('contain', '已签')
        cy.get(':nth-child(15) > div > :nth-child(1)') //拍摄VR
            .click()
            .should('contain', '已拍')
        cy.get('#btnOpenMan')
            .should('contain', '提交')
            .wait(500)
            .click()
            .then(function () {
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
            })
    })

    //开盘审核
    it('开盘审核', function () {
        cy.get('#openman')  //打开开盘审核左导
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#treeTable').should('exist') //判断开盘审核左导数据显示正常
        })
        cy.get('#txtEstateNames') //输入楼盘名称
            .type('TESTabc')
            .then(function () {
                cy.wait(3000)
                cy.get('.ac_results') //下拉选中楼盘名称
                    .wait(1000)
                    .click()
                    .should('contain', 'TESTabc')
            })
        cy.get('#btnBuilding')//输入栋座
            .type('AAA')
            .click()
        cy.wait(3000)
            .then(() => {
                cy.get('.ac_results') //下拉选中栋座
                    .wait(1000)
                    .should('have.class', 'ac_results')
                    .last()
                    .click()
            })
        cy.get('#txtHouseNo') //输入房间号
            .type('0101')
            .should('have.value', '0101')
        cy.get('#btnSubmit') //搜索
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(1000)
                cy.get('#treeTable > tbody > tr > td:nth-child(8)')
                    .children()
                    .eq('1')
                    .should('contain', '确认')
                    .click()
                    .then(function () {
                        cy.wait(1000)
                        cy.get('.aui_state_highlight')
                            .should('contain', '确定')
                            .click()
                    })
            })
    })

    //新增钥匙
    it('新增钥匙', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        //点击钥匙TAB
        cy.get('#titleid')
            .children()
            .eq('3')
            .should('contain', '钥匙')
            .click()
            .wait(1000)
            .then(function () {
                cy.wait(500)
                cy.get('#tabKeyDataView')
                    .should('exist')
            })
        //点击新增钥匙
        cy.get('#btnInsertKey')
            .should('exist')
            .click()
            .then(function () {
                cy.wait(500)
                //输入钥匙编号
                cy.get('#txtKeyNo')
                    .type('910')
                    .should('have.value', '910')
                //确定
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
                    .then(function () {
                        cy.wait(500)
                        cy.get('#tabKeyDataView > tbody > tr')
                            .should('exist')
                    })
            })
    })

    //详情页借钥
    it('详情页借钥', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        //点击钥匙TAB
        cy.get('#titleid')
            .children()
            .eq('3')
            .should('contain', '钥匙')
            .click()
            .wait(1000)
            .then(function () {
                cy.wait(500)
                cy.get('#tabKeyDataView')
                    .should('exist')
            })
        //选中钥匙记录
        cy.get('#tabKeyDataView > tbody > tr')
            .children()
            .eq('0')
            .click()
        cy.wait(1000)
        //点击借钥
        cy.get('#btnBorrow')
            .should('contain', '借钥')
            .click()
            .then(function () {
                cy.wait(500)
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
            })

    })

    //详情页还钥
    it('详情页还钥', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        //点击钥匙TAB
        cy.get('#titleid')
            .children()
            .eq('3')
            .should('contain', '钥匙')
            .click()
            .wait(1000)
            .then(function () {
                cy.wait(500)
                cy.get('#tabKeyDataView')
                    .should('exist')
            })
        //选中钥匙记录
        cy.get('#tabKeyDataView > tbody > tr')
            .children()
            .eq('0')
            .click()
        cy.wait(1000)
        //点击还钥
        cy.get('#btnReturnKey')
            .should('contain', '还钥')
            .click()
            .then(function () {
                cy.wait(500)
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
            })

    })

    //详情页新增委托备案_租售委托
    it('详情页新增委托备案_租售委托', function () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        const detailsUrlLink = Cypress.env('detailsLink')

        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        //点击委托备案TAB
        cy.get('#titleid')
            .children()
            .eq('4')
            .should('contain', '委托备案')
            .click()
            .wait(1000)
            .then(function () {
                cy.wait(500)
                cy.get('#sel_trustType')
                    .should('exist')
            })
        cy.get('#btnEntrustKeepOnRecord')
            .should('contain', '新增委托备案')
            .click()
            .then(function () {
                cy.wait(2000)
                cy.get('#divOnlyTrustType > div > [onlytype="3"] > input')
                    .click()
                    .should('be.checked')
                //输入签署日期
                cy.get('#divStartdateModel > #btnPopupTrustsTime1')
                    .type(currentdate, { force: true })
                    .should('have.value', currentdate)
                //输入委托开始日期
                cy.get('#btnTrustdate')
                    .type(currentdate, { force: true })
                    .should('have.value', currentdate)
                //输入委托结束日期
                cy.get('#btnExpiredate')
                    .type(currentdate, { force: true })
                    .should('have.value', currentdate)
                //点击空白
                cy.get('#EntrustKeepOnRecord')
                    .click()
                //上传附件
                cy.get('#uploadSpanContractBookTrust')
                    .should('exist')
                cy.get('input[type=file]')
                    .eq(0)
                    .attachFile('keting1.jpg', 'jpg')
                    .wait(5000)
                    .trigger('change', { force: true })
                    .then(function () {
                        cy.wait(500)
                        cy.get('[attachmentname="keting1.jpg"] > #PhotoTypeKeyId')
                            .select('2b2eca8f-5007-4b98-a8fb-55efb47bc2d0')
                    })

                cy.get('input[type=file]')
                    .eq(0)
                    .attachFile('keting2.jpg', 'jpg')
                    .wait(5000)
                    .trigger('change', { force: true })
                    .then(function () {
                        cy.wait(500)
                        cy.get('[attachmentname="keting2.jpg"] > #PhotoTypeKeyId')
                            .select('450f6fb6-9e07-4e9e-b7a4-86160bee9dc6')
                    })

                cy.get('input[type=file]')
                    .eq(0)
                    .attachFile('xiaoqutu.jpg', 'jpg')
                    .wait(5000)
                    .trigger('change', { force: true })
                    .then(function () {
                        cy.wait(500)
                        cy.get('[attachmentname="xiaoqutu.jpg"] > #PhotoTypeKeyId')
                            .select('85142e18-0799-44e0-b5e2-116dd6af002b')
                    })
                cy.wait(5000)
                cy.get('#EntrustKeepOnRecord > .tc > #btnOnlyTrustConfirm2')
                    .should('have.value', '保存')
                    .click()
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
                    .then(function () {
                        cy.wait(500)
                        cy.get('.aui_state_highlight')
                            .should('contain', '确定')
                            .click()
                        cy.get('#titleid')
                            .children()
                            .eq('4')
                            .should('contain', '委托备案')
                            .click()
                            .wait(1000)
                            .then(function () {
                                cy.wait(500)
                                cy.get('#dataTable > tbody > tr')
                                    .should('exist')
                            })
                    })
            })
    })

    //委托书审核
    it('委托书审核', function () {
        //打开业主委托审核左导
        cy.get('#registertrusts')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#dataTable').should('exist') //判断业主委托审核左导数据显示正常
        })
        cy.get('#txtEstateNames') //输入楼盘名称
            .type('TESTabc')
            .then(function () {
                cy.wait(2000)
                cy.get('.ac_results') //下拉选中楼盘名称
                    .click()
                    .should('contain', 'TESTabc')
            })
        cy.get('#btnBuilding')//输入栋座
            .type('AAA')
            .click()
        cy.wait(1000)
            .then(() => {
                cy.get('.ac_results') //下拉选中栋座
                    .wait(500)
                    .should('have.class', 'ac_results')
                    .last()
                    .click()
            })
        cy.get('#txtHouseNo') //输入房间号
            .type('0101')
            .should('have.value', '0101')

        cy.get('#btnSubmit') //搜索
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(2000)
                cy.get('#dataTable') //判断搜索结果
                    .should('exist')
                cy.get('#dataTable > tbody > tr')  //审核通过
                    .children()
                    .eq('8')
                    .should('contain', '通过')
                    .scrollIntoView()
                    .then(function () {
                        cy.wait(2000)
                        cy.get('#btn-appoved')
                            .click()
                        cy.get('.aui_state_highlight') //确定审核通过
                            .click()
                            .then(function () {
                                cy.wait(500)
                                cy.get('.aui_state_highlight')
                                    .should('contain', '确定')
                                    .click()
                            })

                    })
            })
    })

    //房源详情页各tab
    it('房源详情页各tab', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)

        //图片
        cy.get('#titleid')
            .children()
            .eq('1')
            .should('contain', '图片')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#photolist')
                    .should('exist')
            })

        //实勘
        cy.get('#titleid')
            .children()
            .eq('2')
            .should('contain', '实勘')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#tabRealSurvey')
                    .should('exist')
            })

        //钥匙
        cy.get('#titleid')
            .children()
            .eq('3')
            .should('contain', '钥匙')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#tabKeyDataView')
                    .should('exist')
            })

        //委托备案
        cy.get('#titleid')
            .children()
            .eq('4')
            .should('contain', '委托备案')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#sel_trustType')
                    .should('exist')
            })

        //叫价记录
        cy.get('#titleid')
            .children()
            .eq('6')
            .should('contain', '叫价记录')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#priceCallRecordSelect')
                    .should('exist')
            })

        //操作日志
        cy.get('#titleid')
            .children()
            .eq('7')
            .should('contain', '操作日志')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#followGrid')
                    .should('exist')
            })

        //成交记录
        cy.get('#titleid')
            .children()
            .eq('8')
            .should('contain', '成交记录')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#divHistory')
                    .should('exist')
            })

        //通话记录
        cy.get('#titleid')
            .children()
            .eq('9')
            .should('contain', '通话记录')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#followGrid')
                    .should('exist')
            })

        //举报
        cy.get('#titleid')
            .children()
            .eq('10')
            .should('contain', '举报')
            .click()
            .wait(1000)
            .then(function () {
                cy.get('#followGrid')
                    .should('exist')
            })
    })

    //房源详情页发布房源广告
    it('房源详情页发布房源广告', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        //根据详情页链接，截取房源keyid信息，为POST请求做数据准备
        var keyid = detailsUrlLink.substring(56)
        //执行POST请求
        cy.request({
            url: 'http://szagency.centaline.com.cn/advert/create-propertyad',
            method: 'POST',
            form: true,
            body: {
                "PropertyKeyId": keyid,
                "TradeType": "1"
            }
        })
            .then((resp) => {
                expect(resp.status).to.eq(200)
                //获取请求返回数据里的PropertyAdKeyId
                var advertKeyID = resp.body['PropertyAdKeyId']
                //拼接发布广告的URL
                var propertyadURL = url + '/advert/propertyad-edit?keyid=' + advertKeyID
                //访问发布广告的URL
                cy.visit(propertyadURL)
                //房源广告标题
                cy.get('#txtTitle')
                    .type('碧海名园 靓房出售')
                //核心卖点
                cy.get('#txtOtherHighlights')
                    .type('碧海名园位于宝安区西乡镇57-1区，西乡大道与铁仔路交汇处，在户型设计上突破传统观念，其大胆出位的设计，精巧时尚的构思，合理的功能分区，结合人性化需求，将现代人居精神与价值深刻体现。')
                //业主有话说
                cy.get('#txtTrustorRemark')
                    .type('碧海名园位于宝安区西乡镇57-1区，西乡大道与铁仔路交汇处，在户型设计上突破传统观念，其大胆出位的设计，精巧时尚的构思，合理的功能分区，结合人性化需求，将现代人居精神与价值深刻体现。')
                //发布房源
                cy.get('#btnPub')
                    .should('have.value', '发布到外网')
                    .click()
                cy.get('.aui_dialog')
                    .should('exist')
            })
    })

    //下架房源广告
    it('下架房源广告', function () {
        cy.get('#mainNav > ul > li:nth-child(4) > a')
            .should('contain', '网络管理')
            .click()
        cy.wait(2000)
        cy.get('#ajaxPages')
            .then(function () {
                //全选
                cy.get('[name=chbSelectAll]')
                    .click()
                    .wait(500)
                //下架
                cy.get('[name=btnBatchDown]')
                    .click()
                    .wait(500)
                //确定
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
            })
    })

    //删除下架的广告
    it('删除下架的广告', function () {
        cy.get('#mainNav > ul > li:nth-child(4) > a')
            .should('contain', '网络管理')
            .click()
        cy.wait(2000)
        cy.get('#titleid > li:nth-child(3)')
            .should('contain', '待上架区')
            .click()
        cy.wait(2000)
        cy.get('#ajaxPages')
            .then(function () {
                //全选
                cy.get('[name=chbSelectAll]')
                    .click()
                    .wait(500)
                //删除
                cy.get('[name=btnBatchDelete]')
                    .click()
                    .wait(500)
                //确定
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
            })
    })

    //详情页回收钥匙
    it('详情页回收钥匙', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        //点击钥匙TAB
        cy.get('#titleid')
            .children()
            .eq('3')
            .should('contain', '钥匙')
            .click()
            .wait(1000)
            .then(function () {
                cy.wait(500)
                cy.get('#tabKeyDataView')
                    .should('exist')
            })
        //选中钥匙记录
        cy.get('#tabKeyDataView > tbody > tr')
            .children()
            .eq('0')
            .click()
        cy.wait(1000)
        //点击回收钥匙
        cy.get('#btnReclaim')
            .should('contain', '回收')
            .click()
            .then(function () {
                cy.wait(500)
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
            })
    })

    //实勘删除
    it('实勘删除', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)

        cy.get('#titleid > :nth-child(3)')
            .should('contain', '实勘')
            .click()

        cy.get('#tabRealSurvey > tbody > tr')
            .children()
            .eq('12')
            .should('contain', '删除')
            .then(($delete) => {
                $delete.children()
                    .eq('2')
                    .trigger("click")
            })
        cy.get('.aui_state_highlight')
            .should('be.visible')
            .click()
            .then(function () {
                cy.wait(500)
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
            })
    })

    //委托书编辑和删除
    it('委托书编辑和删除', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        //点击委托备案TAB
        cy.get('#titleid')
            .children()
            .eq('4')
            .should('contain', '委托备案')
            .click()
            .wait(1000)
            .then(function () {
                cy.wait(500)
                cy.get('#sel_trustType')
                    .should('exist')
            })
        cy.get('#btn-appoved')
            .should('contain', '编辑')
            .click()
        cy.wait(1000)
        cy.get('#EntrustKeepOnRecord > .tc > #btnOnlyTrustCancel')
            .should('have.value', '清空')
            .click()
        cy.get('#btnOnlyTrustEditConfirm2')
            .should('have.value', '保存')
            .click()
            .then(function () {
                cy.wait(500)
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
                    .then(function () {
                        cy.get('.aui_state_highlight')
                            .should('contain', '确定')
                            .click()
                    })
            })
    })

    //房源详情页修改房源状态为暂缓
    it('房源详情页修改房源状态为暂缓', function () {
        const detailsUrlLink = Cypress.env('detailsLink')
        cy.visit(detailsUrlLink) //打开房源详情页链接
            .title()
            .should('contain', '房源详情页')
        cy.wait(1000)
        cy.get('#operatePanel')
            .trigger('mouseover')
            .then(function () {
                cy.wait(500)
                cy.get('#btnPropertyStatusModifyDetail')
                    .should('contain', '状态修改')
                    .click()
                cy.get('#trustorDelayShow2 > div > input')
                    .first()
                    .click()
                cy.get('#CHANGESTATUSdivTextarea')
                    .type('状态修改，添加跟进')
                    .should('have.value', '状态修改，添加跟进')
                cy.get('#btn_upstatus')
                    .should('have.value', '提交')
                    .click()
                cy.get('.aui_state_highlight')
                    .should('contain', '确定')
                    .click()
                cy.reload()
                cy.wait(1000)
                cy.get('#currentStatusStr')
                    .should('contain', '暂停')
            })
    })

    //房源列表页修改房源状态为有效
    it('房源列表页修改房源状态为有效', function () {
        cy.get('[code="30"]')
            .should('contain', '临深盘')  //判断是否包含临深盘
            .click()
        //判断存在并点击图文模式
        cy.get('#liPictureText')
            .should('exist')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdWarZoneList').should('exist') //判断临深盘数据显示正常
            cy.get('#txtEstateNames') //输入楼盘名称
                .type('TESTabc')
                .then(function () {
                    cy.wait(1000)
                    cy.get('.ac_results') //下拉选中楼盘名称
                        .click()
                        .should('contain', 'TESTabc')
                })
            cy.get('#btnBuilding')//输入栋座
                .type('AAA')
                .click()
                .wait(1000)
                .then(() => {
                    cy.get('.ac_results') //下拉选中栋座
                        .should('have.class', 'ac_results')
                        .last()
                        .click({ force: true })
                })
            cy.get('#txtHouseNo') //输入房间号
                .type('0101')
                .should('have.value', '0101')
            cy.get('#btnSubmit')
                .should('have.value', '搜索')
                .click()
                .then(function () {
                    cy.wait(1000)
                    cy.get('#gdWarZoneList') //判断搜索结果
                        .should('exist')
                    cy.wait(500)
                    cy.get('.btnValues') //选中房源
                        .click()
                    cy.get('#btnPropertyStatusModify')//点击状态修改
                        .click()
                        .then(function () {
                            cy.wait(500)
                            cy.get('#CHANGESTATUSdivTextarea')
                                .type('修改状态跟进')
                                .should('have.value', '修改状态跟进')
                            cy.get('#btn_upstatus')
                                .should('have.value', '提交')
                                .click()
                            cy.get('.aui_state_highlight')
                                .should('contain', '确定')
                                .click()
                        })
                })
        })
    })

    //楼盘字典删除房间
    it('楼盘字典删除房间', function () {
        cy.visit('http://szagency.centaline.com.cn/estate/find-estate-for-view?KeyId=57d3fa3a-421b-c8a1-8e6e-08d8a2423893')
        cy.get('.btnRoomList')
            .scrollIntoView()
            .should('exist')
            .click()
        cy.get('#gdRoomList')
            .then(function () {
                cy.wait(1000)
                cy.get('#chbSelectAllRoom')
                    .click()
                cy.get('#btnDelHouse')
                    .should('contain', '删除')
                    .click()
                    .then(function () {
                        cy.get('.aui_state_highlight')
                            .should('contain', '确定')
                            .click()
                    })
            })
    })
    //楼盘字典回收站删除房间
    it('楼盘字典回收站删除房间', function () {
        cy.visit('http://szagency.centaline.com.cn/estate/estate-manage')
        cy.get('#estate-recycle-bin')
            .should('contain', '回收站')
            .click()
        cy.get('#ajaxPages').then(() => {
            cy.wait(2000)
            cy.get('#gdList').should('exist') //判断开盘审核左导数据显示正常
        })
        cy.get('#txtEstateName') //输入楼盘名称
            .type('TESTabc')
            .then(() => {
                cy.wait(5000)
                cy.get('.ac_results') //下拉选中楼盘名称
                    .wait(500)
                    .click()
                    .should('contain', 'TESTabc')
            })
        cy.get('#txtBuildingName')//输入栋座
            .type('AAA')
            .then(() => {
                cy.wait(5000)
                cy.get('.ac_results') //下拉选中栋座
                    .wait(500)
                    .last()
                    .click()
                    .should('have.class', 'ac_results')
            })
        cy.get('#txtHouseNo') //输入房间号
            .type('0101')
            .should('have.value', '0101')
        cy.get('#btnSubmit') //搜索
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(5000)
                cy.get('#gdList > tbody > tr > td:nth-child(1)')
                    .click()
                cy.get('#gdList > tbody > tr > td:nth-child(11) > a:nth-child(2)')
                    .should('contain', '删除')
                    .click()
                    .then(function () {
                        cy.wait(1000)
                        cy.get('.aui_state_highlight')
                            .should('contain', '确定')
                            .click()
                    })

            })
    })

    //搜索磐石小区
    it('搜索磐石小区', function () {
        cy.get('#Serach_AJKId > span')
            .should('contain', '搜索磐石小区')
            .click()
            .then(function () {
                cy.get('#txtAJKEstateNames')
                    .type('幸福里')
                    .should('have.value', '幸福里')
                cy.get('#btnSelectAJK')
                    .should('have.value', '搜索')
                    .click()
                    .then(function () {
                        cy.get('#dataTable')
                            .should('exist')
                    })
            })

    })

    //客源管理图文模式
    it('客源管理图文模式', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#gdIndexCustomerList')
                    .should('exist')
            })
    })

    //客源管理列表模式
    it('客源管理列表模式', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#liTable')
            .should('exist', '列表模式')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#gdIndexCustomerList')
                    .should('exist')
            })
    })

    //全部客源左导
    it('全部客源左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#gdIndexCustomerList')
                    .should('exist')
            })
        cy.get('#liTable')
            .should('exist', '列表模式')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#gdIndexCustomerList')
                    .should('exist')
            })
    })

    //公客池左导
    it('公客池左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#public-customer')
            .should('contain', '公客池')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#gdIndexCustomerList')
                    .should('exist')
            })

    })

    //带看记录左导
    it('带看记录左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#take')
            .should('contain', '带看记录')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#dataTable')
                    .should('exist')
            })
    })

    //跟进记录左导
    it('跟进记录左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#inquiry-follow')
            .should('contain', '跟进记录')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#dataTable')
                    .should('exist')
            })
    })

    //渠道来电左导
    it('渠道来电左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#all-channel')
            .should('contain', '渠道来电')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#dataTable')
                    .should('exist')
            })
    })

    //渠道公客池左导
    it('渠道公客池左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#public-channel')
            .should('contain', '渠道公客池')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#dataTable')
                    .should('exist')
            })
    })

    //黑名单左导
    it('黑名单左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#black-list')
            .should('contain', '黑名单')
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.get('#BlackListTab')
                    .should('exist')
            })
    })

    //洗客池左导
    it('洗客池左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#wash-customer')
            .should('contain', '洗客池')
            .click()
        cy.get('#searchForm')
            .should('exist')
    })

    //潜在客源左导
    it('潜在客源左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#all-precustomer')
            .should('contain', '潜在客源')
            .scrollIntoView()
            .click()
        cy.get('#ajaxPages')
            .should('exist')
            .then(function () {
                cy.wait(5000)
                cy.get('#gdIndexCustomerList')
                    .should('exist')
            })
    })

    //潜在客源管理左导
    it('潜在客源管理左导', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#all-precustomermanager')
            .should('contain', '潜在客源管理')
            .click()
        cy.get('#gdIndexCustomerList')
            .should('exist')
    })

    //新增客源
    it('新增客源', function () {
        cy.visit(url + '/customer/inquiry-add')
            .title()
            .should('contain', '新增客户')
        //输入客户姓名
        cy.get('#ContactContainer > .checkedNumExist > :nth-child(2) > .ipt')
            .type('测试B')
            .should('have.value', '测试B')
        //选择称谓
        cy.get('#ContactContainer > .checkedNumExist > :nth-child(2) > .select')
            .select('000f677d-bfb1-489a-81a8-fa443236e55c')
            .should('contain', '先生')
        //输入手机号
        cy.get('#ContactContainer > .checkedNumExist > :nth-child(3) > .ipt')
            .type('15910992340')
            .should('have.value', '15910992340')
        //输入心里购价
        cy.get('#btnSalePriceFrom1')
            .type('500')
            .should('have.value', '500')
        cy.get('#btnSalePriceTo1')
            .type('600')
            .should('have.value', '600')
        //选择购房原因
        cy.get('#SalePriceTmp > :nth-child(5) > :nth-child(1) > .select')
            .select('61c9c678-ae9b-4a2b-a086-8ba40a046370')
            .should('contain', '单身居住')
        //选中来源：来电
        cy.get('[type="radio"]')
            .check('b74a748f-534c-4096-83fa-2dbb1a23a1a2', { force: true })
            .should('be.checked')
        //提交
        cy.get('#btnSubmitAdd')
            .should('have.value', '提交')
            .click()
        cy.get('.aui_state_highlight')
            .should('be.visible')
            .click()
        //取客源keyID的链接地址并设置为变量
        cy.get('#seeInfoLink').then(($customerInfoLink) => {
            const customerKeyID = $customerInfoLink.attr('href')
            Cypress.env({
                customerDetailsLink: url + customerKeyID
            })
            cy.log(Cypress.env())
        })
    })

    //客源详情页新增跟进
    it('客源详情页新增跟进', function () {
        var customerDetailsUrl = Cypress.env('customerDetailsLink')
        cy.visit(customerDetailsUrl)
        cy.get('#tabmenuiframe')
            .then($iframe => {
                cy.wrap($iframe.contents().find("#txtContentModel"))
                    .type('测试客源新增跟进')
                    .should('have.value', '测试客源新增跟进')
                cy.wrap($iframe.contents().find("#btnPrivatePublicModelSubmit"))
                    .click()
            })
    })

    //客源详情页各TAB
    it('客源详情页各TAB', function () {
        var customerDetailsUrl = Cypress.env('customerDetailsLink')
        cy.visit(customerDetailsUrl)
        //客户跟进TAB
        cy.get('#titleid > li')
            .eq('0')
            .should('contain', '客户跟进')
            .click()
            .then(function () {
                cy.get('#tabmenuiframe')
                    .should('exist')
            })
        //带看记录TAB
        cy.get('#titleid > li')
            .eq('1')
            .should('contain', '带看记录')
            .click()
            .then(function () {
                cy.get('#tabmenuiframe')
                    .should('exist')
            })
        //用户行为TAB
        cy.get('#titleid > li')
            .eq('2')
            .should('contain', '用户行为')
            .click()
            .then(function () {
                cy.get('#tabmenuiframe')
                    .should('exist')
            })
        //操作日志TAB
        cy.get('#titleid > li')
            .eq('3')
            .should('contain', '操作日志')
            .click()
            .then(function () {
                cy.get('#tabmenuiframe')
                    .should('exist')
            })
    })

    //客源详情页编辑客户
    it('客源详情页编辑客户', function () {
        var customerDetailsUrl = Cypress.env('customerDetailsLink')
        //将详情页链接替换为编辑页链接
        var customerEditUrl = customerDetailsUrl.replace('details', 'edit')
        cy.visit(customerEditUrl)
        //点击编辑按钮
        cy.get('#customerEditRemark')
            .type('编辑客源，新增备注信息')
            .click()
        //提交
        cy.get('#btnSubmitEdit')
            .should('have.value', '提交')
            .click()
            .then(function () {
                cy.get('.aui_state_highlight')
                    .should('exist')
                    .click()
            })
    })

    //客源详情页状态修改
    it('客源详情页状态修改', function () {
        var customerDetailsUrl = Cypress.env('customerDetailsLink')
        cy.visit(customerDetailsUrl)
        cy.get('#btnCustomerStatusModify')
            .scrollIntoView()
            .should('contain', '状态更改')
            .click()
            .then(function () {
                cy.get('[name=inquiryStatusKeyIdAll]')
                    .eq('2')
                    .should('have.value', '919d0677-58bf-4c5f-9b32-dff3e949e1e2')
                    .click()
                cy.get('#btnChangeCustomerStatu')
                    .should('have.value', '保存')
                    .click(function () {
                        cy.get('.aui_state_highlight')
                            .should('exist')
                            .click()
                    })
            })
    })

    //客源列表页状态修改
    it('客源列表页状态修改', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        cy.get('#moresel > .iconfont')
            .should('exist')
            .click()
        cy.get('#selContact')
            .select('moble')
            .should('contain', '手机')
        cy.get('#txtContactType')
            .type('15910992340')
            .should('have.value', '15910992340')
        cy.get('#btnSubmitSesrch')
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(2000)
                //选中搜索结果的数据
                cy.get('.td-div > .mt13')
                    .click()
                    .should('be.checked')
                //点击状态更改
                cy.get('#customerStatusModify')
                    .click()
                //修改状态为有效
                cy.get('[name=inquiryStatusKeyIdAll]')
                    .eq('0')
                    .should('have.value', '8e7532c2-726a-4053-ba8b-159081a766a4')
                    .click()
                cy.get('#btnChangeCustomerStatu')
                    .should('have.value', '保存')
                    .click()
            })
    })

    //客源详情页转客
    it('客源详情页转客', function () {
        var customerDetailsUrl = Cypress.env('customerDetailsLink')
        cy.visit(customerDetailsUrl)
        cy.get('#customerTransferCustomerDetail')
            .should('contain', '转客')
            .click()
        //输入用户名并下拉选择
        cy.get('#txtTransferEmployeeName')
            .type('szautotest001')
            .should('have.value', 'szautotest001')
            .get('.ac_results')   //获取用名户下拉框
            .wait(200)
            .should('have.class', 'ac_results')   //判断下拉框是否显示
            .click()
        //确认提交转客
        cy.get('#btnAffirmTranrfer')
            .click()
            .then(function () {
                cy.get('.aui_state_highlight')
                    .should('exist')
                    .click()
            })
    })

    //客源详情页转介
    it('客源详情页转介', function () {
        var customerDetailsUrl = Cypress.env('customerDetailsLink')
        cy.visit(customerDetailsUrl)
        cy.get('#btnCustomerReferralOwner')
            .scrollIntoView()
            .should('contain', '客源转介')
            .click()
            .then(function () {
                cy.get('#txtfindEmployeeName')
                    .type('manager')
                    .should('have.value', 'manager')
                    .get('.ac_results')   //获取用名户下拉框
                    .wait(200)
                    .should('have.class', 'ac_results')   //判断下拉框是否显示
                    .click()
                cy.get('#btnSubmitCustomerReferralOwner')
                    .click()
                    .then(function () {
                        cy.get('.aui_state_highlight')
                            .should('exist')
                            .click()
                    })
            })
    })

    //客源列表页转客
    it('客源列表页转客', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        cy.get('#moresel > .iconfont')
            .should('exist')
            .click()
        cy.get('#selContact')
            .select('moble')
            .should('contain', '手机')
        cy.get('#txtContactType')
            .type('15910992340')
            .should('have.value', '15910992340')
        cy.get('#btnSubmitSesrch')
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(2000)
                //选中搜索结果的数据
                cy.get('#allInquiry > tbody:nth-child(2) > tr.data-table-div > td > div > input')
                    .click()
                    .should('be.checked')
                //点击转客
                cy.get('#customerTransferCustomer')
                    .click()
                    .then(function () {
                        cy.get('#txtTransferEmployeeName')
                            .type('szautotest001')
                            .should('have.value', 'szautotest001')
                            .get('.ac_results')   //获取用名户下拉框
                            .wait(200)
                            .should('have.class', 'ac_results')   //判断下拉框是否显示
                            .click()
                    })
                //确认提交转客
                cy.get('#btnAffirmTranrfer')
                    .click()
                    .then(function () {
                        cy.get('.aui_state_highlight')
                            .should('exist')
                            .click()
                    })
            })
    })

    //房源列表页设置VIP客户
    it('房源列表页设置VIP客户', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        cy.get('#moresel > .iconfont')
            .should('exist')
            .click()
        cy.get('#selContact')
            .select('moble')
            .should('contain', '手机')
        cy.get('#txtContactType')
            .type('15910992340')
            .should('have.value', '15910992340')
        cy.get('#btnSubmitSesrch')
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(2000)
                //选中搜索结果的数据
                cy.get('.td-div > .mt13')
                    .click()
                    .should('be.checked')
                //点击设置VIP
                cy.get('#customerSetModify')
                    .click()
                    .then(function () {
                        cy.get('#ulSetCustom > :nth-child(1) > label')
                            .click()
                        cy.get('#btnSubmitIsVip')
                            .should('have.value', '保存')
                            .click(function () {
                                cy.get('.aui_state_highlight')
                                    .should('exist')
                                    .click()
                            })
                    })
            })
    })

    //客源列表页取消VIP客户
    it('客源列表页取消VIP客户', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        cy.get('#moresel > .iconfont')
            .should('exist')
            .click()
        cy.get('#selContact')
            .select('moble')
            .should('contain', '手机')
        cy.get('#txtContactType')
            .type('15910992340')
            .should('have.value', '15910992340')
        cy.get('#btnSubmitSesrch')
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(2000)
                //选中搜索结果的数据
                cy.get('.td-div > .mt13')
                    .click()
                    .should('be.checked')
                //点击取消VIP
                cy.get('#customerSetModify')
                    .click()
                    .then(function () {
                        cy.get('#ulSetCustom > li:nth-child(2) > label')
                            .click()
                        cy.get('#btnSubmitIsVip')
                            .should('have.value', '保存')
                            .click(function () {
                                cy.get('.aui_state_highlight')
                                    .should('exist')
                                    .click()
                            })
                    })
            })
    })

    //客源快捷筛选渠道来电客户
    it('客源快捷筛选渠道来电客户', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        //点击图文模式
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        //重置
        cy.get('#btnClear')
            .click()
        cy.get('#IsChannelInquiry')
            .click()
            .should('be.checked')
            .then(function () {
                cy.get('#allInquiry')
                    .should('exist')
            })
    })

    //客源快捷筛选中原找房用户
    it('客源快捷筛选中原找房用户', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        //点击图文模式
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        //重置
        cy.get('#btnClear')
            .click()
        cy.get('#IsAPP')
            .click()
            .should('be.checked')
            .then(function () {
                cy.get('#allInquiry')
                    .should('exist')
            })
    })

    //客源快捷筛选30天租房到期客
    it('客源快捷筛选30天租房到期客', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        //点击图文模式
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        //重置
        cy.get('#btnClear')
            .click()
        cy.get('[name=PropertyboolCalcTag]')
            .check('5d8edd6e-5a15-4b25-ac03-3d97edbb02fb')
            .should('be.checked')
            .then(function () {
                cy.get('#allInquiry')
                    .should('exist')
            })
    })

    //客源快捷筛选转介客
    it('客源快捷筛选转介客', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        //点击图文模式
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        //重置
        cy.get('#btnClear')
            .click()
        cy.get('#IsCustomerReferral')
            .click()
            .should('be.checked')
            .then(function () {
                cy.get('#allInquiry')
                    .should('exist')
            })
    })

    //客源列表页删除客源
    it('客源列表页删除客源', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.wait(1000)
        cy.get('#liPictureText')
            .should('exist', '图文模式')
            .click()
        cy.get('#moresel > .iconfont')
            .should('exist')
            .click()
        cy.get('#selContact')
            .select('moble')
            .should('contain', '手机')
        cy.get('#txtContactType')
            .type('15910992340')
            .should('have.value', '15910992340')
        cy.get('#btnSubmitSesrch')
            .should('have.value', '搜索')
            .click()
            .then(function () {
                cy.wait(2000)
                //选中搜索结果的数据
                cy.get('.td-div > .mt13')
                    .click()
                    .should('be.checked')
                //点击删除
                cy.get('#DelCustomer')
                    .click()
                cy.get('.aui_state_highlight')
                    .click()
            })
        cy.reload()
    })

    //我的转介左导删除转介客
    it('我的转介左导删除转介客', function () {
        cy.get('#mainNav > ul > li:nth-child(3) > a')
            .should('contain', '客源管理')
            .click()
        cy.get('#my-referral')
            .should('contain', '我的转介')
            .click()
        cy.get('#moresel > .iconfont')
            .should('exist')
            .click()
        cy.get('#selContact')
            .select('moble')
            .should('contain', '手机')
        cy.get('#txtContactType')
            .type('15910992340')
            .should('have.value', '15910992340')
        cy.get('#btnSubmitSesrch')
            .should('have.value', '搜索')
            .click()
        cy.wait(2000)
        cy.get('.normal > a').then(($referralLink) => {
            const referralLinkKeyID = $referralLink.attr('href')
            var referralurl = url + referralLinkKeyID
            cy.visit(referralurl)
            cy.get('#btnDeleteCustomer')
                .click()
                .then(function () {
                    cy.get('.aui_state_highlight')
                        .should('exist')
                        .click()
                })
        })
    })

})