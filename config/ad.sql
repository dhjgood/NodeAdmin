#某设计 数据库
SET NAMES UTF8;
DROP DATABASE IF EXISTS  adesign;
CREATE DATABASE adesign CHARSET=UTF8;
USE adesign;

-- 用户表
-- 后台管理者账号  tp = M  账号密码 
-- 前台用户账号    tp = U  账号密码 其他暂定，，，
CREATE TABLE ad_user(
    u_id INT PRIMARY KEY AUTO_INCREMENT,    #用户id
    tp   VARCHAR(1),                        #用户类型
    user VARCHAR(18),                       #账号
    upwd VARCHAR(15),                       #密码
    mail VARCHAR(15),                       #邮箱
    create_time DATETIME(8),                #创建时间
    avatar VARCHAR(255),                    #头像
    phone VARCHAR(11)                       #手机
    
);

-- INSERT INTO ad_user VALUES
-- ('null','M','xiaohong','1234567',null,null,'httpwdadawdawdawd'),
-- ('null','U','普通用户','1234567','2654749024@qq.com','2020-3-18 20:11:11','httpwdadawdawdawd');

