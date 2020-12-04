//<reference types="Cypress" />
describe("深圳agency",function(){
    it("登录",function(){
        cy.visit('http://szagency.centaline.com.cn/') //打开深圳A+网址
        cy.title().should('contain','用户登录') //判断是否打开（打开正确，标题包含‘用户登录’字样）
        cy.get('#txtUserName') //获取用户名输入框
            .click()
            .type('Ceshiszautotest')   //输入用户名
            .should('have.value','Ceshiszautotest')  //判断用户名输入是否正确
        cy.get('.ac_results')   //获得下拉框
            .should('be.visible')   //判断下拉框是否显示
            .click()
        cy.get('#txtPassword')  //获取密码输入框
            .type('f1zzb4ck')   //输入密码
        cy.get('.btn-org')  //获取登录按钮
            .should('contain','登录')   //判断登录框是否显示
            .click()   //提交登录               
    })

    it("房源列表页",function(){
        cy.get('#war-zone')
            .should('be.visible') //判断通盘房源左导是否显示
    })
})