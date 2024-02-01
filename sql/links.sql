CREATE TABLE links (
	id MEDIUMINT NOT NULL AUTO_INCREMENT,
    url CHAR(128) NOT NULL,
    title char(128) NOT NULL,
    description char(255),
    PRIMARY KEY(id)
);

INSERT INTO links (url, title, description) VALUES
	('https://shorecrest.ssd412.org/', 'Shorecrest High School', ''),
    ('https://www.towncenteratlakeforest.com/','Lake Forest Park Town Center', ''),
    ('https://www.regmovies.com/theatres/regal-cinebarre-mountlake/1958', 'Cinebarre', ''),
    ('https://www.uwmedicine.org/mychart', 'UW Medicine MyChart Portal', ''),
	('https://www.republicservices.com/municipality/lake-forest-park-wa', 'Republic Services', 'Garbage and recycling. We\'re R1 schedule'),
    ('https://www.pse.com/', 'Puget Sound Electric', ''),
    ('https://www.pse.com/en/outage/outage-map', 'Outage Map', 'Shows PSE power outages'),
    ('https://www.google.com/maps/@47.6351528,-122.3821279,11.5z/data=!5m1!1e1?entry=ttu', 'Google Traffic', ''),
    ('https://wsdot.com/Travel/Real-time/Map/', 'WSDOT', 'Traffic Map');

SELECT * FROM links
