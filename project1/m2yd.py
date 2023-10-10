#simple script that converts user meter input to yards.
#useful to me as i've starting swimming and my pool was measured by meters, but I need to know the yardage for splits.

#simply enter the amount of meters and it will spit out the conversion to yards.

meters = input("Enter the amount of meters:")

#cast meters to float so it can be multiplied
yards = (float(meters) * 1.094)

#cast yards variable back to str to print
print((meters) + " meters is equal to " + str(yards) + " yards." )