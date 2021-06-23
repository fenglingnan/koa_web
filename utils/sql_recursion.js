module.exports = {
    //测试递归sql
    test_child: `
        delimiter $$  
        drop function if exists get_child_list$$  
        create function get_child_list(in_id varchar(10)) returns varchar(1000)  
        begin  
            declare ids varchar(1000) default '';  
            declare tempids varchar(1000);  
          
            set tempids = in_id;  
            while tempids is not null do  
                set ids = CONCAT_WS(',',ids,tempids);  
                select GROUP_CONCAT(id) into tempids from dept where FIND_IN_SET(pid,tempids)>0;   
            end while;  
            return ids;  
        end   
        $$  
        delimiter ;    
    `,
    test_parent: `
        delimiter $$  
        drop function if exists get_parent_list$$  
        create function get_parent_list(in_id varchar(10)) returns varchar(1000)  
        begin  
            declare ids varchar(1000);  
            declare tempid varchar(10);  
           
            set tempid = in_id;  
            while tempid is not null do  
                set ids = CONCAT_WS(',',ids,tempid);  
                select pid into tempid from dept where id=tempid;  
            end while;  
            return ids;  
        end  
        $$  
        delimiter ;  
    `,
    //民法典页递归sql
    civil_rec: `
        delimiter $$  
        drop function if exists get_civil_parent$$  
        create function get_civil_parent(in_id int) returns int  
        begin  
            declare ids int;  
            declare tempid int;  
           
            set tempid = in_id;  
            while tempid is not null do  
                set ids = CONCAT_WS(',',ids,tempid);  
                select parent_id into tempid from civil_laws where id=tempid;  
            end while;  
            return ids;  
        end  
        $$  
        delimiter ; 
    `
}