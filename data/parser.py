import csv


def format_date(date):
    # Dates don't need a lot of formatting... just remove any extra spaces
    date_tokens = date.split(' ')
    date = ' '.join([d for d in date_tokens if d.strip() != ''])

    return date

def parse_satcat():
    fn = 'satcat.txt'

    lines = open(fn, 'r').readlines()

    sc_list = []

    for i, line in enumerate(lines):
        # print('Parsing this line:')
        # print(line)

        entry = {}

        entry['international_designator'] = line[:13].strip()
        entry['norad_cat_number'] = line[13:18].strip()
        entry['multiple_name_flag'] = line[19:20].strip()
        entry['payload_flag'] = line[20:21].strip()
        entry['op_status_code'] = line[21:22].strip()
        entry['sat_name'] = line[23:47].strip()
        entry['source_or_ownership'] = line[49:54].strip()
        entry['launch_date'] = line[56:66].strip()
        entry['launch_site'] = line[68:73].strip()
        entry['decay_date'] = line[75:85].strip()
        entry['orbital_period'] = line[87:94].strip()
        entry['inclination'] = line[96:101].strip()
        entry['apogee'] = line[103:109].strip()
        entry['perigee'] = line[111:117].strip()
        entry['radar_cross_section'] = line[119:127].strip()
        entry['orbital_status'] = line[129:132].strip()

        sc_list.append(entry)

    return sc_list


def parse_launch_log():
    fn = 'launchlog.txt'
    lines = open(fn, 'r').readlines()

    ll_list = []

    for i, line in enumerate(lines):
        # print('Parsing this line:')
        # print(line)

        # Skip commented lines
        if line.startswith('#'):
            continue
        
        launch = {}

        launch['launch_site'] = line[:13].strip()
        date = line[13:40]
        # Skip payloads, which will be indented beneath their LV
        if date.startswith(' '):
            continue
        else:
            launch['date'] = date.strip()
        
        launch['cospar'] = line[40:55].strip()
        launch['pl_name'] = line[55:86].strip()
        launch['orig_pl_name'] = line[86:112].strip()
        launch['satcat_id'] = line[112:121].strip()
        launch['lv_type'] = line[121:144].strip()
        launch['lv_sn'] = line[144:160].strip()
        launch['site_0'] = line[160:169].strip()
        launch['site_1'] = line[169:193].strip()
        launch['success'] = line[193:198].strip()
        launch['ref'] = line[198:].strip()

        # Put into list
        ll_list.append(launch)

        # print(launch)

    print('Parsed %s entries from launch log file.' % len(ll_list))

    return ll_list

# mll_entry['Launch Site (Abbrv.)'], mll_entry['Launch Site (Full)'], mll_entry['Latitude'], mll_entry['Longitude'] 
def get_launch_site_info(site0, site1, sc_list, entry):
    # Replace any sites that are recognized from the sc_list
    for sc_entry in sc_list:
        # print(sc_entry)
        if sc_entry['international_designator'] == entry['cospar']:
            site0 = sc_entry['launch_site']
            break

    if site0.startswith('L-1011,'):
        site0 = site0[7:]
    if site0.startswith('K-496,'):
        site0 = site0[6:]
    if site0.startswith('K-407,'):
        site0 = site0[6:]
    if site0.startswith('K-84,'):
        site0 = site0[5:]

    if site0 == 'CC' or site0 == 'KSC' or site0 == 'AFETR':
        return 'AFETR', 'Kennedy Space Center/Cape Canaveral, USA', 28.391139, -80.588343
    elif site0 == 'NIIP-5' or site0 == 'GIK-5' or site0 == 'TYMSC':
        return 'TYMSC', 'Baikonur Cosmodrome, Kazakhstan', 45.6, 63.4
    elif site0 == 'NIIP-53':
        return 'PLMSC', 'Plesetsk Missile and Space Complex, Russia', 62.8, 40.1
    elif site0 == 'VS' or site0 == 'V' or site0 == 'PA' or site0 == 'F4D-1 747' or site0 == 'NB-52 008' or site0 == 'AFWTR' or site0 == 'WRAS':
        return 'AFWTR', 'Vandenberg Air Force Base, USA', 34.4, -120.35
    elif site0 == 'WI' or site0 == 'MARS' or site0 == 'WLPIS' or site0 == 'ERAS':
        return 'ERAS','Wallops Flight Facility, USA', 37.8, -75.5
    elif site0 == 'KMR' or site0 == 'KWAJ':
        return 'KWAJ', 'Omelek Island, Kwajalein Atoll', 9.049117, 167.743151
    elif site0 == 'KASC' or site0 == 'USC' or site0 == 'KSCUT':
        return 'KSCUT', 'Uchinoura Space Center, Japan', 31.2, 131.1
    elif site0 == 'L-1011,GANC' or site0 == 'CAS':
        return 'CAS','Spaceport Gran Canaria, Spain',27.931944,-15.386667 
    elif site0 == 'YAS' or site0 == 'DLS':
        return 'DLS','Dombarovsky Air Base, Russia',50.8,59.516667 
    elif site0 == 'CSG' or site0 == 'FRGUI':
        return 'FRGUI','Guiana Space Centre, French Guiana',5.232,-52.776
    elif site0 == 'HMG' or site0 == 'HGSTR':
        return 'HGSTR','Hammaguir Launch Site, Algeria',30.875014,-3.065188 
    elif site0 == 'JQ' or site0 == 'JSC':
        return 'JSC','Jiuquan Satellite Launch Center, China',40.6,99.9 
    elif site0 == 'KLC' or site0 == 'KODAK':
        return 'KODAK','Kodiak Launch Complex, Alaska, USA',57.438136,-152.344617 
    elif site0 == 'GTsP-4' or site0 == 'KYMSC':
        return 'KYMSC','Kapustin Yar Missile and Space Complex, Russia',48.4,45.8 
    elif site0 == 'NARO' or site0 == 'NSC':
        return 'NSC','Naro Space Center, South Korea',34.431867,127.535069 
    elif site0 == 'GIK-1' or site0 == 'GNIIP' or site0 == 'GNIIPV' or site0 == 'PLMSC':
        return 'PLMSC','Plesetsk Missile and Space Complex, Russia',62.8,40.1 
    elif ''.join([site0, site1]) == 'ODYSSEY,KLA' or site0 == 'SEAL':
        return 'SEAL','Sea Launch Platform (mobile), USA',0.1,-154 
    elif site0 == 'SEM' or site0 == 'SEMLS':
        return 'SEMLS','Imam Khomeini Space Center, Iran',35.234722,53.920833 
    elif site0 == 'SMLC' or site0 == 'SNMLP':
        return 'SNMLP','Broglio Space Centre, Kenya',-2.938333,40.2125 
    elif site0 == 'SHAR' or site0 == 'SRILR':
        return 'SRILR','Satish Dhawan Space Centre, India',13.9,80.4 
    elif site0 == 'BLA' or site0 == 'SUBL':
        return 'SUBL','Submarine Launch Platform (mobile), Russia',74.803859,36.610515 
    elif site0 == 'GIK-2' or site0 == 'SVOBO':
        return 'SVOBO','Svobodnyy Launch Complex, Russia',51.4,128.3 
    elif site0 == 'TYSC' or site0 == 'TAISC':
        return 'TAISC','Taiyuan Space Center, China',37.5,112.6 
    elif site0 == 'TNSC' or site0 == 'TANSC':
        return 'TANSC','Tanegashima Space Center, Japan',30.4,131 
    elif site0 == 'WOO' or site0 == 'WOMRA':
        return 'WOMRA','Woomera Test Range, Australia',-31.1,136.8 
    elif site0 == 'XSC' or site0 == 'XICLF':
        return 'XICLF','Xichang Launch Facility, China',28.25,102 
    elif site0 == 'PALB' or site0 == 'YAVNE':
        return 'YAVNE','Yavne Launch Facility, Israel',31.5,34.5 
    elif site0 == 'SOHAE' or site0 == 'YUN':
        return 'YUN','Sohae Satellite Launching Station, North Korea',39.660083,124.705306 
    elif site0 == 'ALCA':
        return '','Alcantara Space Center, Brasil',-2.373056,-44.396389 
    elif site0 == 'TONGH':
        return '','Tonghae Satellite Launching Ground, North Korea',40.85,129.666667
    elif site0 == 'VOST' or site0 == 'VOSTO':
        return 'VOST','Vostochny Cosmodrome, Russia',51.884553,128.334778
    elif site0 == 'HADC':
        return 'HADC', 'Holloman Air Force Base',32.852500,-106.106389
    elif site0 == 'KAU':
        return 'KAU','Kauai Test Facility',22.0580,-159.7770
    elif site0 == 'MAHIA' or site0 == 'RLLB':
        return 'MAHIA', 'Mahia Rocket Lab Launch Complex 1', -39.260900, 177.865500
    elif site0 == 'WSC' or site0 == 'WEN':
        return 'WSC', 'Wenchang Spacecraft Launch Site', 19.614492, 110.951133

    else:
        print(entry)
        print('%s | %s' % (site0, site1))
        
    # if (site0 == '' and site1 == ''):
    #     print(entry)

    return '', '', '', ''


# Apply a few exceptions to handle missions that failed drastically in a way that
# was related to launch but not considered a launch failure
def get_success(entry):
    # Challenger disaster
    if entry['cospar'] == '1986-F01':
        return 'F'
    # Columbia disaster
    elif entry['cospar'] == '2003-003A':
        return 'F'
    else:
        return entry['success']

def check_manual_tags(entry):
    tag_file = 'tags.txt'
    
    lines = open(tag_file,'r').readlines()
    
    for line in lines:
        line_tokens = line.split(',')
        if len(line_tokens) == 2:
            cospar = line_tokens[0].strip()
            tag = line_tokens[1].strip()

            if entry['cospar'] == cospar:
                return tag
    
    return ''

# Tags include: Moon, Venus, Mars, Outer Solar System, Space Shuttle, and SpaceX
def get_tag(entry):
    # Check for manual tags
    tag = check_manual_tags(entry)
    if tag != '':
        return tag
    elif entry['lv_type'] == 'Falcon 1' or entry['lv_type'] == 'Falcon 9' or entry['lv_type'] == 'Falcon Heavy':
        return 'SpaceX'
    elif entry['lv_type'] == 'Space Shuttle':
        return 'Space Shuttle'
    else:
        return ''

def make_and_dump_massive_launch_log(launch_log_list, sc_list):
    # Make a list of dictionaries with all of the data we need
    mll_list = []

    for entry in launch_log_list:
        mll_entry = {}

        mll_entry['Launch Date and Time (UTC)'] = format_date(entry['date'])
        mll_entry['Launch Site (Abbrv.)'], mll_entry['Launch Site (Full)'], mll_entry['Latitude'], mll_entry['Longitude'] = get_launch_site_info(entry['site_0'], entry['site_1'], sc_list, entry)
        mll_entry['Launch Vehicle'] = entry['lv_type']
        mll_entry['Success'] = get_success(entry)
        mll_entry['Official Payload Name'] = entry['pl_name']
        mll_entry['COSPAR'] = entry['cospar']
        mll_entry['Tag'] = get_tag(entry)

        mll_list.append(mll_entry)
    
    print('Translated into %s entries.' % len(mll_list))

    # Output as a csv
    with open('launch_log_for_load.csv', 'w', newline='') as csvfile:
        fieldnames = list(mll_list[0].keys())

        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        
        for entry in mll_list:
            writer.writerow(entry)


def main():
    sc_list = parse_satcat()
    launch_log_list = parse_launch_log()
    make_and_dump_massive_launch_log(launch_log_list, sc_list)


if __name__ == '__main__':
    main()