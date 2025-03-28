CREATE TABLE carpark(
    carparkid VARCHAR(8) NOT NULL,
    area TEXT NOT NULL,
    development TEXT NOT NULL,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    lottype VARCHAR(2) NOT NULL,
    agency VARCHAR(3) NOT NULL,
    CONSTRAINT pkey PRIMARY KEY (carparkid, lottype)
);

CREATE TABLE carparklots(
    carparkid VARCHAR(8) NOT NULL,
    lottype VARCHAR(2) NOT NULL,
    availablelots INTEGER NOT NULL,
    updatetime TIMESTAMP NOT NULL,
    CONSTRAINT fk_carparkid
        FOREIGN KEY(carparkid, lottype)
            REFERENCES carpark(carparkid, lottype)
);

CREATE TABLE mrtstationinfo(
    stationnumber VARCHAR(5) NOT NULL,
    stationname TEXT NOT NULL,
    stationabrreviation VARCHAR(5) NOT NULL, 
    stationline VARCHAR(5) NOT NULL,
    CONSTRAINT mrtpkey PRIMARY KEY (stationnumber)
);

CREATE TABLE mrtcongestionlevel(
    starttime TIMESTAMP NOT NULL,
    endtime TIMESTAMP NOT NULL,
    stationnumber TEXT NOT NULL,
    crowdlevel TEXT NOT NULL,
    CONSTRAINT fk_stationnumber
        FOREIGN KEY(stationnumber)
            REFERENCES mrtstationinfo(stationnumber)
);

CREATE TABLE settings(
    carparkpricinglimit VARCHAR(10) NOT NULL,
    maximumwalkingdistance INTEGER NOT NULL,
    gpsstatus VARCHAR(5) NOT NULL
);

CREATE TABLE feedbackrecords(
    feedbackid INTEGER NOT NULL,
    feedbackmessage TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    CONSTRAINT feedbackkey PRIMARY KEY (feedbackid)
);