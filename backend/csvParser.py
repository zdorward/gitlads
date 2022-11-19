import csv
import sqlite3

class DataUnit:
    city = ""
    flights = ""
    hotels = ""
    food = ""
    def __init__(self, city, flights, hotels, food):
        self.city = city
        self.flights = flights
        self.hotels = hotels
        self.food = food       

def csvToSQL(csvFilePath):
    results = []
    with open(csvFilePath) as csvfile:
        reader = csv.reader(csvfile) 
        for row in reader: # each row is a list
            results.append(row)    
    #print(results)
    
    connection = sqlite3.connect("data.db")
    cursor = connection.cursor()
    
    categoryNumbers = [1, 3, 5, 5]
        
    #transform data into DataUnits
    
    tableData = []
    for row in results:
        if row != results[0]:
            loc = row[0].strip().replace(' ', '')
            flights = row[1] + " " + row[2] + " " + row[3]
            hotels = row[4] + " " + row[5] + " " + row[6] + " " + row[7] + " " + row[8]
            foods = row[9] + " " + row[10] + " " + row[11] + " " + row[12] + " " + row[13]
            x = DataUnit(loc, flights, hotels, foods)
            tableData.append(x)
    
    print(tableData)
    
    for i  in range(len(tableData)):
        cursor.execute("create table " + str(tableData[i].city) + " (Flights text, Hotels text, Foods text)")
        SQLtable = []
        SQLtable.append(str(tableData[i].flights))
        SQLtable.append(str(tableData[i].hotels))
        SQLtable.append(str(tableData[i].food))
        cursor.executemany("insert into " + tableData[i].city + " values (?, ?, ?)", (SQLtable,))
        connection.commit()
        #for row in cursor.execute("select * from " + tableData[i].city):
        #   print(row)
    connection.close()

csvToSQL(r'C:\Users\ericx\Desktop\gitlads\data\data.csv')

