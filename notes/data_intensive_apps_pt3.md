---
title: "Designing Data-Intensive Apps (PART 3)"
description: "My personal notes from part 3 of 'Designing Data-Intesive Applications' by Martin Kleppman"
date: "01/20/2024"
labels: "data"
---

# Data-Intesive Applications (PART 3)

## Derived Data

Broad categories for systems that store and process data:
- Systems of record: the source of truth. First written here.  
- Derived data systems: transformatin of source data. An example of this would be a cache.

Derived data is technically _redundant_. A database is just a tool. This distinction between system of record vs derived data is not dependent on the tool, but how you use it in the application.

### Batch Processing

Different types of web systems: 
- Services (online systems): waits for a request or instruction from a client to arrive. Handles request, doess work, and responds as quickly as possible.
- Batch processing systems (offline systems): processes a large amount of data, produces some output data. Run as a _job_.
- Stream processing systems (near-real-time systems): Somewhere in between servers and batch-processing. 

The [MapReduce algorithm](https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf) was called "the algorithm that makes Google so massively scalable". It was a major step forward in terms of the scale of processing that could be achieved on commodity hardware.

Batch processing is not a new concept. Punch card tabulating machines implemented a form of semi-mechanized batch processing to compute statistics, specifically the [Hollerith machine](https://www.census.gov/history/www/innovations/technology/the_hollerith_tabulator.html) was used for the 1890 US Census. 

#### Batch Processing with Unix Tools

Example: 

```bash
cat /var/log/nginx/access.log |
  awk '{print $7}' | # Split each line into fields, output only 7th field of each line
  sort             | # Alpha sort 
  uniq -c          | # Remove repeated lines, and output counter
  sort -r -n       | # Sort by count, reverse order
  head -n 5          # First five lines output
```

You could write this program with some language, but Unix handles memory better for larger data-sets. Unix only runs on a single machine however, and that is where Hadoop comes in.

#### MapReduce and Distributed Filestystems

MapReduce is a bit like Unix tools, but distributed across thousands of machines. MapReduce jobs read and write files on a distributed file system. Hadoop's implementation of this file system is called Haddop Distrubuted File System (**HDFS**) - an open source reimplementation of Google File System. Object storage services (Amazon S3) are also similar in many ways. 

**HDFS** is based on the _shared-nothing_ principle. It consists of a daemon process running on each machine, exposing a newtork service that allow's other nodes to access files stored on that machine. _NameNode_ is a server that keeps track of where files are across the machines. HDFS deployments can run on tens of thousands of machines.

Steps of a MapReduce job: 
1. Read a set of input files, and break it up into _records_. 
2. Call the mapper fn to extract a k, v from each input record (awk '{print $7}'). 
3. Sort all of the key-value pairs by key.
4. Call the reducer function to iterate over the sorted k, v pairs (uniq -c)

You need to implement two functions: 
- _Mapper_: called once for every input, extract k,v pairs. 
- _Reducer_: collects all of the values associated with the same key. Can produce output records (counts).

So for example, if you need to do two _sorts_. You could write two MapReduce jobs - where the second uses the output of the first. The role of the mapper would be to prepare the data by putting it into a form suitable for sorting, and the reducer is to process the data that has been sorted. 

In Hadoop MapReduce, the mapper and reducer are written in Java. In MondoDB and CouchDB, they are implemented in JavaScript. MapReduce parallelizes the computation across many machines - since the mapper and reducer only operate on one input file at a time. Note, the input file might be hundreds of megabytes in size. It is very common to chain MapReduce jobs into _workflows_. 

#### Reduce-Side Joins and Grouping

The book discussed an interesting example of processing user events, and attempting to join the event data with the user database given a foreign key (such as the user_id). It would be impractical to query the user database while processing each event (via random-access requests over the network). A better approach would be to take a copy of the user database, and put it in the same distributed filesystem as the even log files. 

Mappers "send messages" to the reducers. Mappers emit k,v pairs where the key acts as an address. All k,v pairs will be derived to the same destination (a call to the reducer) if they have the same key. 


#### Map-Side Joins

A job which there are no reducers or sorting. Each mapper reads on input file block from the filestystem, writes one output file to the filesystem. 

- Broadcast hash joins
- Partitioned hash joins
- Map-side merge joins

#### The Output of Batch Workflows

The output of a batch process is often not a report, but some other kind of structure.

- Search indexes: an index of documents (document IDs)
- Key-value stores/databases: write to the database directly from the mapper or reducer, although it would be much better to build a brand new database _inside_ of the batch job and write it as output files. 

### Beyond MapReduce

The files on the filesystem of MapReduce represent an _intermediate state_. A means of passing data from one job to another. The process of writing this state to intermediate files is called _materialization_. 

#### Dataflow engines

Call a user-defined function to process one record at a time on a single thread.

_Personal note_: This is getting into some territory where I built out a dataflow engine using SQS, where the data coming in was data derived but not yet written to the database (the job would write it to the database). Although, the input was not assumed to be bounded in size. 

## Stream Processing

The input for stream processing can be labeled as an _event_. An _event_ is similar to a file: a small, self-contained, immutable object containing details of something that happened at some point in time.

In batch processing, a file is written once and then read by multiple different jobs. In streaming a _producer_ generates an event _once_, and then potentially processed by multiple _consumers_.

_Message brokers_ can help handle the situation where a producer creates events faster than the consumers can process. The message broker acts as a database that the producer(s) and consumer(s) can connect to. With multiple consumers, two main patterns emerge when the consumer tries to read the same topic (message): 
- Load balancing: each message is delivered to one of the consumers 
- Fan out: message is delivered to all consumers

### Processing Streams

1. Write to the database, cache, search index, etc
2. Push events to users in some way, email alerts, notifications, or events to a real time dashboard 
3. Process one or more input streams to produce one output stream. Several processing stages, into a derived stream.

### Uses of stream processing
- Fraud detection
- Trading systems 
- Manufacturing systems
- Military and intelligence systems

#### Complex event processing

CEP system: reverses typical query and data relationship. Stores query long term, and data (or event) is produced when query matches event pattern.

## The Futures of Data Systems

I liked this excerpt: 

```
Even spreadsheets have dataflow programming capabilities that are miles ahead of most mainstream programming languages [33]. In a spreadsheet, you can put a for‐ mula in one cell (for example, the sum of cells in another column), and whenever any input to the formula changes, the result of the formula is automatically recalculated. This is exactly what we want at a data system level: when a record in a database changes, we want any index for that record to be automatically updated, and any cached views or aggregations that depend on the record to be automatically refreshed. You should not have to worry about the technical details of how this refresh happens, but be able to simply trust that it works correctly.

Thus, I think that most data systems still have something to learn from the features that VisiCalc already had in 1979 [34]. The difference from spreadsheets is that today’s data systems need to be fault-tolerant, scalable, and store data durably. They also need to be able to integrate disparate technologies written by different groups of people over time, and reuse existing libraries and services: it is unrealistic to expect all software to be developed using one particular language, framework, or tool.
```

In regards to "Responsibility and Accountablility", I liked this quote.
```
A blind belief in the supremacy of data for making decisions is not only delusional, it is positively dangerous. As data-driven decision making becomes more widespread, we will need to figure out how to make algorithms accountable and transparent, how to avoid reinforcing existing biases, and how to fix them when they inevitably make mistakes.
```

The author is vocal about being _pro-active_ when addressing recommendation systems or data that impacts humans. The effect data has on people's lives should always be in considerations. The example of a credit score is given. Does the existing system reinforce or amplify existing differences beetween people?  

The author points out that when a system stores data that a user has explicity entered because the user wants that data processed in a certain way, the system is performing a _service_. The relationship is less clear with data that is tracked or logged as a side-effect. The line between _surveillance_ and _service_ is blurred.  

```
Fundamentally, I think we need a culture shift in the tech industry with regard to personal data. We should stop regarding users as metrics to be optimized, and remember that they are humans who deserve respect, dignity, and agency. We should self-regulate our data collection and processing practices in order to establish and maintain the trust of the people who depend on our software [111]. And we should take it upon ourselves to educate end users about how their data is used, rather than keeping them in the dark.
```

This book was dense. Especially for someone without a traditional Comp Science background. It lifted the veil on some topics which I didnt even know about, and shed some light or context on patterns I have implemented myself. Overall, it feels a bit overhyped on _needing_ to be read for job interviews - although, I did find it interesting and it expanded my horizon of realizing how much information and knowledge is out there in relation to data storage. 
