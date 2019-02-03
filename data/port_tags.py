logfile = 'massive_launchlog.csv'

lines = open(logfile, 'r').readlines()

outfile = open('tags.txt', 'w')

cospar_tags = []

for line in lines:
    tokens = line.split(',')
    cospar = tokens[11].strip()
    tag = tokens[-1].strip()

    if tag != '' and cospar != '' and not cospar.startswith('Launch'):
        cospar_tags.append([cospar, tag])

cospar_tags.sort()

for cospar, tag in cospar_tags:
    outfile.write(cospar + ',' + tag + '\n')