set global slow_query_log=1;
set global long_query_time=1;

create index user_id_index on match_group_member(user_id);
create index department_role_member_user_id_belong on department_role_member(user_id, belong);
create index role_id_and_belong_idx on department_role_member(role_id, belong);
create index mail_and_password_idx on user(mail, password);
create index user_name_idx on user(user_name);
