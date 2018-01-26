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

CREATE TABLE  yliu12.HOURLY_SUMMERY(
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



#