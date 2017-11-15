import sys
import json

def routes(infile, outfile):
    objects = []
    with open(infile, 'r') as read:
        for line in read:
            tokens = line.split(',')
            objects.append({
                'cities': [tokens[0], tokens[1]],
                'length': int(tokens[2]),
                'color': tokens[3]
            })
    result = {'_comment': "Auto Generated using csv_to_json.py. To Reformat JSON data, modify csv_to_json.py and run $ python csv_to_json.py routes inputfile.csv outputfile.json"}
    result['routes'] = objects
    json.dump(result, open(outfile, 'wb'))

def tickets(infile, outfile):
    objects = []
    with open(infile, 'r') as read:
        for line in read:
            tokens = line.split(',')
            objects.append({
                'cities': [tokens[0], tokens[1]],
                'points': int(tokens[2]),
            })
    result = {'_comment': "Auto Generated using csv_to_json.py. To Reformat JSON data, modify csv_to_json.py and run $ python csv_to_json.py tickets inputfile.csv outputfile.json"}
    result['tickets'] = objects
    json.dump(result, open(outfile, 'wb'))

if __name__ == '__main__':
    if(sys.argv[1] == 'routes'):
        routes(sys.argv[2], sys.argv[3])
    else:
        tickets(sys.argv[2], sys.argv[3])
