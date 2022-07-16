# Commissions Calculator Service

Calculate commission fees for given cash in/out transactions.

Usage example:

---

## How to Clone the App and Install the Dependencies

### **NOTE**: don't include the dollar-sign($) in your commands.

if you have a github account then run the following command in your terminal.

```
$ git clone https://github.com/Sidahmeders/CommissionsCalculator.git
```

then cd to the cloned directory by running:

```
$ cd CommissionsCalculator
```

then to Install the Dependencies run

```
$ npm install
```

---

## How to Run the Program:

1. the first method is to pass in a relative path as third argument, in our case **(input.json)**

```
$ npm run exec input.json
```

### OR

2. the second way is to pass an asbolute path in your file-system

```
$ npm run exec
```

`then you will be prompted to enter the file-path:`

#### NOTE: we are parsing JSON files (**.json**). other formats like (.csv) or similar will throw an error.

### Example:

---

## How to Run the Test Suites

you can simply run this command in your terminal

```
$ npm run test
```

NOTE: This unit tests are not comprehensive and some tests have one assertion only.

## Example and Data Description

the program expect your commission data input to include and adhere
to the following format.

```
{
    "date": "2016-01-05",
    "user_id": 1,
    "user_type": "natural",
    "type": "cash_in",
    "operation": {
        "amount": 200,
        "currency": "EUR"
    }
}

```

### date types and descriptions

|       ##        |           user_id            |               date               |                                user_type                                 |                      type                      |              operation.amount               |    operation.currency    |
| :-------------: | :--------------------------: | :------------------------------: | :----------------------------------------------------------------------: | :--------------------------------------------: | :-----------------------------------------: | :----------------------: |
|  **dateTypes**  |            number            |               date               |                                  string                                  |                     string                     |                   number                    |          string          |
| **description** | a unique identifier, integer | operation date in format `Y-m-d` | user type, one of “natural”(natural person) or “juridical”(legal person) | operation type, one of “cash_in” or “cash_out” | operation amount(for example `2.12` or `3`) | operation currency `EUR` |

### some tests cases with it's expected output.

```
user_id, date,       user_type, type,     amount/currency
1        2016-01-05  natural    cash_in   200 EUR
2        2016-01-06  juridical  cash_out  300 EUR
1        2016-01-06  natural    cash_out  30000 EUR
1        2016-01-07  natural    cash_out  1000 EUR
1        2016-01-07  natural    cash_out  100 EUR
1        2016-01-10  natural    cash_out  100 EUR
2        2016-01-10  juridical  cash_in   1000000 EUR
3        2016-01-10  natural    cash_out  1000 EUR
1        2016-02-15  natural    cash_out  300 EUR
➜ node main.js
...............
0.06
0.90
87.00
3.00
0.30
0.30
5.00
0.00
0.00
```
