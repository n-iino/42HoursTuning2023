set global slow_query_log=1;
set global long_query_time=1;

create index user_id_index on match_group_member(user_id);
create index department_role_member_user_id_belong on department_role_member(user_id, belong);
