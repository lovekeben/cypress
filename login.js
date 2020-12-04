//<reference types="Cypress" />
describe("深圳agency",function(){
    it("登录",function(){
        cy.visit('http://szagency.centaline.com.cn/') //打开深圳A+网址
        cy.title().should('contain','用户登录') //判断是否打开（打开正确，标题包含‘用户登录’字样）
        cy.get('#txtUserName') //获取用户名输入框
            .click()
            .type('Ceshiszautotest')   //输入用户名
            .should('have.value','Ceshiszautotest')  //判断用户名输入是否正确
        cy.get('.ac_results')   //获取用名户下拉框
            .should('be.visible')   //判断下拉框是否显示
            .click()
        cy.get('#txtPassword')  //获取密码输入框
            .type('f1zzb4ck')   //输入密码
        cy.get('.btn-org')  //获取登录按钮
            .should('contain','登录')   //判断登录框是否显示
            .click()   //提交登录               
    })

    it("通盘房源",function(){
        cy.get('#war-zone')  //获取通盘房源左导
            .should('be.visible') //判断通盘房源左导是否显示
        cy.get('#districtType') //获取二级导航
        cy.wait(1000) //等待1秒
        cy.get('[code="10"]')
            .should('contain','二手盘') //判断是否包含二手盘
            .click()
        cy.wait(1000)
        cy.get('[code="60"]')
            .should('contain','商住盘')  //判断是否包含商住盘
            .click()
        cy.wait(1000)
        cy.get('[code="20"]')
            .should('contain','一手盘')  //判断是否包含一手盘
            .click()
        cy.wait(1000)
        cy.get('[code="30"]')
            .should('contain','临深盘')  //判断是否包含临深盘
            .click()
        cy.wait(1000)
        cy.get('[code="40"]')
            .should('contain','上数盘')  //判断是否包含上述盘
            .click()
        cy.wait(1000)
        cy.get('[code="50"]')
            .should('contain','数据盘')  //判断是否包含数据盘
            .click()
    })
})