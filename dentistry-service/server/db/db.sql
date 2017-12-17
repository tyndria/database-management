DROP TABLE "PATIENT";
CREATE TABLE "PATIENT"
(
"ID" NUMBER(*,0),
"FIRST_NAME" VARCHAR2(40 BYTE),
"LAST_NAME" VARCHAR2(40 BYTE),
"ADDRESS" VARCHAR2(40 BYTE),
"BIRTH_DATE" DATE,
"PAYMENT_TYPE_ID" NUMBER(*,0),
"DOCTOR_ID"  NUMBER(*,0)
) SEGMENT CREATION IMMEDIATE
PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM" ;

DROP TABLE "PAYMENT_TYPE";
CREATE TABLE "PAYMENT_TYPE"
(
"ID" NUMBER(*,0),
"TYPE" VARCHAR2(40 BYTE)
) SEGMENT CREATION IMMEDIATE
PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM" ;

DROP TABLE "DOCTOR";
CREATE TABLE "DOCTOR"
(
"ID" NUMBER(*,0),
"FIRST_NAME" VARCHAR2(40 BYTE),
"LAST_NAME" VARCHAR2(40 BYTE),
"ADDRESS" VARCHAR2(40 BYTE),
"BIRTH_DATE" DATE
) SEGMENT CREATION IMMEDIATE
PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM" ;

DROP TABLE "TOOTH_FORMULA";
CREATE TABLE "TOOTH_FORMULA"
 (
 "ID" NUMBER(*,0),
 "IS_MISSED" NUMBER(1),
 "IS_ARTIFICIAL" NUMBER(1),
 "IS_CROWN" NUMBER(1),
 "IS_MILK" NUMBER(1),
 "TYPE" VARCHAR2(40 BYTE),
 "PATIENT_ID"  NUMBER(*,0)
 ) SEGMENT CREATION IMMEDIATE
PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM" ;

DROP TABLE "SERVICE";
CREATE TABLE "SERVICE"
(
"ID" NUMBER(*,0),
"TITLE" VARCHAR2(40 BYTE),
"COST" VARCHAR2(40 BYTE)
) SEGMENT CREATION IMMEDIATE
PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM" ;

DROP TABLE "VISIT_SERVICE";
CREATE TABLE "VISIT_SERVICE"
(
"SERVICE_ID" NUMBER(*,0),
"VISIT_ID" NUMBER(*,0)
) SEGMENT CREATION IMMEDIATE
PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM" ;

DROP TABLE "VISIT";
CREATE TABLE "VISIT"
(
"ID" NUMBER(*,0),
"VISIT_DATE" DATE,
"DOCTOR_ID" NUMBER(*,0),
"PATIENT_ID" NUMBER(*,0)
) SEGMENT CREATION IMMEDIATE
PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM" ;

-----------------------------------------------------------------
-- Sequences -----------------------------------------------------

DROP SEQUENCE "PATIENT_SEQ";
CREATE SEQUENCE  "PATIENT_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 38 CACHE 20 NOORDER  NOCYCLE ;

DROP SEQUENCE "DOCTOR_SEQ";
CREATE SEQUENCE  "DOCTOR_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 4 CACHE 20 NOORDER  NOCYCLE ;

DROP SEQUENCE  "VISIT_SEQ";
CREATE SEQUENCE  "VISIT_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 24 CACHE 20 NOORDER  NOCYCLE ;

DROP SEQUENCE  "VISIT_SERVICE_SEQ";
CREATE SEQUENCE  "VISIT_SERVICE_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 24 CACHE 20 NOORDER  NOCYCLE ;

DROP SEQUENCE  "TOOTH_FORMULA_SEQ";
CREATE SEQUENCE  "TOOTH_FORMULA_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 24 CACHE 20 NOORDER  NOCYCLE ;

DROP SEQUENCE  "SERVICE_SEQ";
CREATE SEQUENCE  "SERVICE_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 24 CACHE 20 NOORDER  NOCYCLE ;

------------------------------------------------------------------
-- Fullfill tables------------------------------------------------

REM INSERTING into PAYMENT_TYPE
SET DEFINE OFF;
Insert into PAYMENT_TYPE (ID, TYPE) values (1,'CASH');
Insert into PAYMENT_TYPE (ID, TYPE) values (2,'CASHLESS');

REM INSERTING into DOCTOR
SET DEFINE OFF;
Insert into DOCTOR (ID, FIRST_NAME, LAST_NAME, ADDRESS, BIRTH_DATE) values (1,'Kate','Hoho', 'Minsk, Uralavo', TO_DATE('11-13-1980', 'MM-DD-YYYY'));
Insert into DOCTOR (ID, FIRST_NAME, LAST_NAME, ADDRESS, BIRTH_DATE) values (2,'James','Brot', 'Minsk, 140', TO_DATE('11-13-1970', 'MM-DD-YYYY'));
Insert into DOCTOR (ID, FIRST_NAME, LAST_NAME, ADDRESS, BIRTH_DATE) values (3,'Nen','Hohopfew', 'Minsk, 4653', TO_DATE('09-23-1978', 'MM-DD-YYYY'));

REM INSERTING into PATIENT
SET DEFINE OFF;
Insert into PATIENT (ID, FIRST_NAME, LAST_NAME, ADDRESS, BIRTH_DATE, PAYMENT_TYPE_ID, DOCTOR_ID)
    values (1,'Kate','Hoho', 'Minsk, Uralavo', TO_DATE('11-13-1980', 'MM-DD-YYYY'), 1, 1);
Insert into PATIENT (ID, FIRST_NAME, LAST_NAME, ADDRESS, BIRTH_DATE, PAYMENT_TYPE_ID, DOCTOR_ID)
    values (2,'James','Brot', 'Minsk, 140', TO_DATE('11-13-1970', 'MM-DD-YYYY'), 2, 1);
Insert into PATIENT (ID, FIRST_NAME, LAST_NAME, ADDRESS, BIRTH_DATE, PAYMENT_TYPE_ID, DOCTOR_ID)
    values (3,'Nen','Hohopfew', 'Minsk, 4653', TO_DATE('09-23-1978', 'MM-DD-YYYY'), 2, 3);

REM INSERTING into SERVICE
SET DEFINE OFF;
Insert into SERVICE (ID, TITLE, COST) values (1, 'TOOTH EXTRACTION', 40);
Insert into SERVICE (ID, TITLE, COST) values (2, 'TOOTH CLEAN', 5);
Insert into SERVICE (ID, TITLE, COST) values (3, 'TOOTH CROWN', 80);

REM INSERTING into TOOTH_FORMULA
SET DEFINE OFF;
Insert into TOOTH_FORMULA (ID, IS_MISSED, IS_ARTIFICIAL, IS_CROWN, IS_MILK, TYPE, PATIENT_ID)
    values (1, 0, 0, 0, 0, 'incisors', 1);
Insert into TOOTH_FORMULA (ID, IS_MISSED, IS_ARTIFICIAL, IS_CROWN, IS_MILK, TYPE, PATIENT_ID)
    values (2, 0, 0, 0, 0, 'incisors', 2);
Insert into TOOTH_FORMULA (ID, IS_MISSED, IS_ARTIFICIAL, IS_CROWN, IS_MILK, TYPE, PATIENT_ID)
    values (3, 0, 0, 0, 0, 'incisors', 3);

REM INSERTING into VISIT
SET DEFINE OFF;
Insert into VISIT (ID, VISIT_DATE, DOCTOR_ID, PATIENT_ID) values (1, TO_DATE('11-13-2017 08:20', 'MM-DD-YYYY HH:MI'), 2, 1);
Insert into VISIT (ID, VISIT_DATE, DOCTOR_ID, PATIENT_ID) values (2, TO_DATE('08-15-2017 11:00', 'MM-DD-YYYY HH:MI'), 3, 3);
Insert into VISIT (ID, VISIT_DATE, DOCTOR_ID, PATIENT_ID) values (3, TO_DATE('09-01-2017 06:00', 'MM-DD-YYYY HH:MI'), 1, 1);

REM INSERTING into VISIT_SERVICE
SET DEFINE OFF;
Insert into VISIT_SERVICE (SERVICE_ID, VISIT_ID) values (1, 1);
Insert into VISIT_SERVICE (SERVICE_ID, VISIT_ID) values (2, 2);
Insert into VISIT_SERVICE (SERVICE_ID, VISIT_ID) values (1, 3);

--------------------------------------------------------
--  Constraints

ALTER TABLE "PATIENT" DROP CONSTRAINT "PATIENT_PK";
ALTER TABLE "PATIENT" ADD CONSTRAINT "PATIENT_PK" PRIMARY KEY ("ID")
USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM"  ENABLE;

ALTER TABLE "PAYMENT_TYPE" DROP CONSTRAINT "PAYMENT_TYPE_PK";
ALTER TABLE "PAYMENT_TYPE" ADD CONSTRAINT "PAYMENT_TYPE_PK" PRIMARY KEY ("ID")
USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM"  ENABLE;

ALTER TABLE "DOCTOR" DROP CONSTRAINT "DOCTOR_PK";
ALTER TABLE "DOCTOR" ADD CONSTRAINT "DOCTOR_PK" PRIMARY KEY ("ID")
USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM"  ENABLE;

ALTER TABLE "SERVICE" DROP CONSTRAINT "SERVICE_PK";
ALTER TABLE "SERVICE" ADD CONSTRAINT "SERVICE_PK" PRIMARY KEY ("ID")
USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM"  ENABLE;

ALTER TABLE "VISIT" DROP CONSTRAINT "VISIT_PK";
ALTER TABLE "VISIT" ADD CONSTRAINT "VISIT_PK" PRIMARY KEY ("ID")
USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS
STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
TABLESPACE "SYSTEM"  ENABLE;

--------------------------------------------------------
--  Ref Constraints

ALTER TABLE "PATIENT" DROP CONSTRAINT "PAYMENT_TYPE_FK";
ALTER TABLE "PATIENT" ADD CONSTRAINT "PAYMENT_TYPE_FK" FOREIGN KEY ("PAYMENT_TYPE_ID")
  REFERENCES "PAYMENT_TYPE" ("ID") ENABLE;
ALTER TABLE "PATIENT" DROP CONSTRAINT "PATIENT_DOCTOR_FK";
ALTER TABLE "PATIENT" ADD CONSTRAINT "PATIENT_DOCTOR_FK" FOREIGN KEY ("DOCTOR_ID")
  REFERENCES "DOCTOR" ("ID") ENABLE;

ALTER TABLE "TOOTH_FORMULA" DROP CONSTRAINT "TOOTH_PATIENT_FK";
ALTER TABLE "TOOTH_FORMULA" ADD CONSTRAINT "TOOTH_PATIENT_FK" FOREIGN KEY ("PATIENT_ID")
  REFERENCES "PATIENT" ("ID") ENABLE;

ALTER TABLE "VISIT" DROP CONSTRAINT "VISIT_DOCTOR_FK";
ALTER TABLE "VISIT" ADD CONSTRAINT "VISIT_DOCTOR_FK" FOREIGN KEY ("DOCTOR_ID")
  REFERENCES "DOCTOR" ("ID") ENABLE;
ALTER TABLE "VISIT" DROP CONSTRAINT "VISIT_PATIENT_FK";
ALTER TABLE "VISIT" ADD CONSTRAINT "VISIT_PATIENT_FK" FOREIGN KEY ("PATIENT_ID")
  REFERENCES "PATIENT" ("ID") ENABLE;

ALTER TABLE "VISIT_SERVICE" DROP CONSTRAINT "SERVICE_FK";
ALTER TABLE "VISIT_SERVICE" ADD CONSTRAINT "SERVICE_FK" FOREIGN KEY ("SERVICE_ID")
  REFERENCES "SERVICE" ("ID") ENABLE;
ALTER TABLE "VISIT_SERVICE" DROP CONSTRAINT "VISIT_FK";
ALTER TABLE "VISIT_SERVICE" ADD CONSTRAINT "VISIT_FK" FOREIGN KEY ("VISIT_ID")
  REFERENCES "VISIT" ("ID") ENABLE;

