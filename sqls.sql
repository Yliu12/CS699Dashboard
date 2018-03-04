select * from cs699.mac_report order by MR_USERNAME desc;

select * from cs699.mac_report2 as init where MR_USERNAME = "swu" 
 
GROUP BY MR_MAC 
ORDER BY Magnitude;


select DISTINCT MR_MAC, MR_IP
 from cs699.mac_report2 where MR_USERNAME = "swu";


select *
 from cs699.mac_report2 where MR_USERNAME = "swu";
 
 
SELECT MR_USERNAME, COUNT(*) AS magnitude 
FROM cs699.mac_report2 
GROUP BY MR_USERNAME 
ORDER BY magnitude DESC
LIMIT 20;

CREATE TABLE  yliu12.HOURLY_SUMMERY2(
USER_COUNT VARCHAR(30),
MR_HOUR datetime,
DEVICE_COUNT varchar(30)
)





#========================GROUP BY GIVEN TIME FRAME=======================

;
INSERT INTO yliu12.hourly_summary
SELECT '2017-10-05 08:00:00',
       Count(*),
       Count(DISTINCT mr_mac),
       Count(DISTINCT mr_username)
FROM   cs699.mac_report2
WHERE  mr_time >= '2017-10-05 08:00:00'
       AND mr_time < '2017-10-05 09:00:00';

;


SELECT *
      FROM cs699.mac_report2
      Where MR_TIME> '2017-10-05 08:00:00' and MR_TIME<'2017-10-05 08:20:00'


SELECT Date('2017MR_MACMR_MACmac_reportmac_reportmac_report-10-05 08:00:00')

hourly_summary
==============================REPORT2_TIME==================================

SELECT min(MR_TIME),max(MR_TIME),Count(distinct MR_TIME)
      FROM cs699.mac_report2

'2017-10-05 00:08:59','2017-10-05 23:48:54','72'

=============================================================================

;
CREATE TABLE yliu12.HOURLY_SUMMARY(
	RECORD_DATETIME datetime,
    RECORD_COUNT varchar(32),
    DEVICE_COUNT varchar(32),
    USER_COUNT varchar(32)

);

DROP Table yliu12.HOURLY_SUMMARY;
#=============================================================================

 SELECT HOUR(MR_TIME), WEEKDAY(MR_TIME), COUNT(*)
      FROM cs699.mac_report
      GROUP BY HOUR(MR_TIME), WEEKDAY(MR_TIME)
      ORDER BY HOUR(MR_TIME), WEEKDAY(MR_TIME);

SELECT HOUR(MR_TIME), WEEKDAY(MR_TIME), COUNT(*),MR_MAC
      FROM cs699.mac_report2
      GROUP BY HOUR(MR_TIME), WEEKDAY(MR_TIME)
      ORDER BY HOUR(MR_TIME), WEEKDAY(MR_TIME);




#==============================select records with user info to new table====================================================
INSERT INTO yliu12.NOT_NULL_USER_ONLY
SELECT *
FROM   cs699.mac_report2
WHERE  MR_USERNAME IS NOT NULL && MR_USERNAME != ""
limit 1,10;


Create Table yliu12.NOT_NULL_USER_ONLY(
MR_MAC varchar(20) ,
MR_TIME datetime ,
MR_IP char(15) ,
MR_SWITCH varchar(30) ,
MR_PORT varchar(30) ,
MR_EXTERNAL_IP char(15), 
MR_DNS varchar(30) ,
MR_USERNAME varchar(50), 
MR_CONTROLLER varchar(30), 
MR_AP varchar(50) ,
MR_DESCRIPTION varchar(50)
);

drop table  yliu12.NOT_NULL_USER_ONLY;

SELECT count(*)
FROM   yliu12.NOT_NULL_USER_ONLY 


#==========================================================================================




#============================Device VS User from data w/ user info============================================

SELECT   Count(mr_username), ( 
         CASE 
                  WHEN t.device_count = '1' THEN "1" 
                  WHEN t.device_count = '2' THEN "2" 
                  WHEN t.device_count = '3' THEN "3" 
                  WHEN t.device_count >3 
                  AND      device_count <6 THEN "4-5" 
                  WHEN t.device_count >5 
                  AND      device_count <11 THEN "5-10" 
                  ELSE '10+' 
         END) AS device_range 
FROM     ( 
                  SELECT   mr_username, 
                           Count(DISTINCT mr_mac) AS device_count 
                  FROM     yliu12.not_null_user_only #where mr_username = "swu" 
                  GROUP BY mr_username ) AS t 
GROUP BY device_range;

#========================================================================

#===================================EVERY THING USEFUL FROM HERE=====================================



drop table yliu12.hourly_summary3;

;
commit;

CREATE TABLE yliu12.HOURLY_SUMMARY3(
	RECORD_DATETIME datetime,
    RECORD_COUNT varchar(32),
    DEVICE_COUNT varchar(32),
    USER_COUNT varchar(32)

);

commit;

SELECT * FROM yliu12.hourly_summary1;

SELECT * FROM yliu12.hourly_summary3;


INSERT INTO yliu12.HOURLY_SUMMARY3 (RECORD_DATETIME, RECORD_COUNT, DEVICE_COUNT, USER_COUNT)

 SELECT '2017-10-05 0:00:00', Count(*), Count(DISTINCT mr_mac),Count(DISTINCT mr_username)
 FROM   cs699.mac_report2
 WHERE  mr_time >= '2017-10-05 0:00:00' AND mr_time < '2017-10-05 0:59:59'  And mr_username != "";





 SELECT '2017-10-05 0:00:00', Count(*), Count(DISTINCT mr_mac),Count(DISTINCT mr_username) FROM   cs699.mac_report2 WHERE  mr_time >= '2017-10-05 0:00:00' AND mr_time < '2017-10-05 0:59:59'  And mr_username != "";

 #==========================   BUILDING_SUMMARY     ==========

 SELECT '2017-10-05 0:00:00',
	 left(MR_AP,2)as building,
       Count(DISTINCT mr_mac) as device,
       Count(DISTINCT mr_username) as user
FROM   cs699.mac_report2
WHERE  mr_time >= '2017-10-05 0:00:00'
       AND mr_time < '2017-10-06 0:00:00 '
       And mr_username != ""

group by building;



drop table yliu12.BUILDING_SUMMARY;
commit;

CREATE TABLE yliu12.BUILDING_SUMMARY(
	RECORD_DATETIME datetime,
    BUILDING varchar(32),
    DEVICE_COUNT INT,
    USER_COUNT INT

);
commit;


INSERT INTO yliu12.BUILDING_SUMMARY (RECORD_DATETIME, BUILDING, DEVICE_COUNT, USER_COUNT)

SELECT '2017-10-05 0:00:00',
	 left(MR_AP,2)as building,
       Count(DISTINCT mr_mac) as device,
       Count(DISTINCT mr_username) as user
FROM   cs699.mac_report2
WHERE  mr_time >= '2017-10-05 0:00:00'
       AND mr_time < '2017-10-06 0:00:00 '
       And mr_username != ""

group by building;

select * from yliu12.BUILDING_SUMMARY;

#====================     processed_data     ================
drop TABLE yliu12.processed_data;
commit;

CREATE TABLE yliu12.Processed_data(
	RECORD_DATETIME datetime,
    RECORD_KEY varchar(32),
    RECORD_VALUE varchar(32)

);

commit;

insert into yliu12.processed_data values('2017-10-05 0:00:00', 'BUILDING_MOST_USER', 'bl');
insert into yliu12.processed_data values('2017-10-05 0:00:00' ,'BUILDING_MOST_USER_NUMBER', 4322);



insert into yliu12.processed_data
select '2017-10-05 0:00:00',"DEVICE_TOTAL", count(DISTINCT mr_mac)
from   cs699.mac_report2
;

insert into yliu12.processed_data
select '2017-10-05 0:00:00',"USER_TOTAL", count(DISTINCT MR_USERNAME)
from   cs699.mac_report2
;

insert into yliu12.processed_data
select '2017-10-05 0:00:00',"CONNECTION_TOTAL", count(*)
from   cs699.mac_report2
;

insert into yliu12.processed_data
select '2017-10-05 0:00:00',"IP_TOTAL", count(DISTINCT MR_IP)
from   cs699.mac_report2
;



select * from yliu12.processed_data;


#====================    NO_OF_DEVICE_USED   ===================





CREATE TABLE yliu12.NO_OF_DEVICE_USED(
	RECORD_DATETIME datetime,
	USER_COUNT INT,
    DEVICE_RANGE varchar(32)
);
commit;



insert into yliu12.NO_OF_DEVICE_USED

SELECT '2017-10-05 0:00:00', Count(mr_username), (
         CASE
                  WHEN t.device_count = '1' THEN "1"
                  WHEN t.device_count = '2' THEN "2"
                  WHEN t.device_count = '3' THEN "3"
                  WHEN t.device_count >3
                  AND      device_count <6 THEN "4-5"
                  WHEN t.device_count >5
                  AND      device_count <11 THEN "5-10"
                  ELSE '10+'
         END) AS device_range
FROM     (
                  SELECT   mr_username,
                           Count(DISTINCT mr_mac) AS device_count
                  FROM     yliu12.not_null_user_only #where mr_username = "swu"
                  GROUP BY mr_username ) AS t
GROUP BY device_range;

select * from yliu12.NO_OF_DEVICE_USED;
