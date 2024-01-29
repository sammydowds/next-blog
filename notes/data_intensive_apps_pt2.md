---
title: "Designing Data-Intensive Apps (PART 2)"
description: "My personal notes from part 2 of 'Designing Data-Intesive Applications' by Martin Kleppman"
date: "01/02/2024"
labels: "data"
---

# Data-Intesive Applications (PART 2)

Continuing on to reading Designing Data-Intesive Apps, part II. 

## Distributed Data

What happens when multiple machines are involved in storage and retrieval of data?

Why distribute a database across multiple machines? 
- _Scalability_: handle higher volues of read or write loads if the one machine cant handle it
- _Availability_: redundancy 
- _Latency_: data can be closer to the user

## Scaling to a higher load

**Vertical scaling** is when you increase the power of a single machine to scale. However, cost grows non-linearly. 

A _shared-memory_ architecture joins many CPUs, RAM chips, and disks so any CPU can access any part of the memory or disk - and all components are treated as a single machine.   


**Horizontal scaling** is an approach where each machine or virtual machine running the database software is called a node. Each node uses its CPUs, RAM, and disks independently. Coordination between nodes is done on the software level. This is also called the _shared-nothing_ architecture. 

This book focuses on _shared-nothing_ architectures.

### Replication vs Partitioning

_Replication_ - keeping a copy of the same data on several different nodes.

_Partitioning_ - Splitting the big database into smaller subsets called _partitions_ (sharding). This is useful when on machine cannot hold a copy of the entire dataset.

## Replication


Three algorithms for replicating changes in data between nodes: 
- _single leader_
- _multi-leader_
- _leaderless_


#### Leaders and Followers

Each node that stores a copy of the database is called a _replica_. Every write to the database needs to be processed by every _replica_. The most common solutin for this is _leader based_ replication.

1. One node is the _leader_. Writes are sent to the _leader_ first. 
2. The other nodes are _followers_. Data changes are sent via a _replication log_ a _change stream_ to the _followers_, applying the same writes in the same order. 
3. Reads are allowed on all nodes, however only the _leader_ can receive writes. 

This feature is built into many relational databases. Followers can be synchronous or async, however, when you enable synchronous it typically only means one _follower_ is synchronous and the rest are async - guaranteeing you have the most up to date data on at least two nodes (sometimes referred to _semi-synchronous_). 

#### Read after write consistency

If a customer reads data from one of the followers, and the follower does not have the most up to date data - the customer will be unhappy. How do you solve for this?
- Some data may only be written by the user, so always read that data from the leader (example: profile data)
- Read from the leader if its within a certain time-span that the data has been updated last (prevent queries on any follower that is more than xx mins behind)

#### Monotonic reads

Prevent reading replicas which represent state that is no longer up to date (making it appear like time is going backwards). One way of handling this is making sure that a user always makes their reads from the same replica.  


#### Consisten prefix reads

If a certain sequence of writes happens in a certain order, then anyone reading those writes will see them appear in the same order. 

One solution is to ensure that any writes that are causally related are written to the same partition. 

### Multi-Leader Replication

It rarely makes sense to use multi-leader setup within a single datacenter.

#### Use Cases

**Multi-datacenter operation**: more efficient because all of you writes do not have to go through only one data-center (one leader)

This has many advantages: performance, tolerance of outages (redundancy), tolerance of network issues (writes processing do not stop with network issues occur).

A big downside of multi-leader replication is having to handle conflicts between writes to either data-center. 

Clients with offline operation act as an async mutli-leader replication process. An example being a phone's calendar. If offline, the data is stored locally and then later updated across the services when the phone is back online. The device itself could be considered a "data center".

#### Handling write conflicts

- Give each write a unique ID, pick the write with the highest ID as the winner, data loss
- Give each replica a unique ID, let writes at a higher-numbered replica always take precedence, data loss
- Somehow merge the values together
- Record the conflict in an explicit data structure that preserves all information, and write application code to resolve confilcts async

### Leaderless Replication

Any replica can accept writes. In some implementations the client directly sends its writes to _several_ replicas or there might be a coordinator node who does this on behalf of the client without preserving the order of the writes. 

If a node goes down in a leaderless architecture, writes could be missed and when the node comes back online it could contain stale data. To solve that problem, sometimes the client sends read requests to _several_ nodes in parallel. Version numbers are used to determine which value is newer. 

There are a couple of ways of keeping data in sync: 
- _read repair_: client can detect stale responses, and then the client writes the new value back to the stale replica
- _Anti-entropy process_: background process looks for differences in the data, and copies from one replica to another


## Transactions

Transactions can help reduce the amount of potential error cases you need to think about. Processes crashing, network interrupts, power outages, disk full, unexpected concurrency can all make data become incosistent in various ways.  


## The Trouble with Distributed Systems

Partial failures are non-deterministic. Unlike, hardware (computers) - which are either broken or not.

**Shared-nothing systems** have become the dominant way of building systems. These are systems which share no hardware, but can make requests to each other. High reliability can be achieved through redundancy.

Some example of partial failures: 
- Packet is lost over the network or delayed
- Node's clock is out of sync
- A process may pause, be declared dead, then come back to life

A **Byzantine fault** is any fault presenting different symptoms to different observers. Distributed Systems require consensus among their distributed nodes.  

