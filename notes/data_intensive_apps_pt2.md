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

### Scaling to a higher load

**Vertical scaling** is when you increase the power of a single machine to scale. However, cost grows non-linearly. 

A _shared-memory_ architecture joins many CPUs, RAM chips, and disks so any CPU can access any part of the memory or disk - and all components are treated as a single machine.   


**Horizontal scaling** is an approach where each machine or virtual machine running the database software is called a node. Each node uses its CPUs, RAM, and disks independently. Coordination between nodes is done on the software level. This is also called the _shared-nothing_ architecture. 

This book focuses on _shared-nothing_ architectures.

#### Replication vs Partitioning

_Replication_ - keeping a copy of the same data on several different nodes.

_Partitioning_ - Splitting the big database into smaller subsets called _partitions_ (sharding). This is useful when on machine cannot hold a copy of the entire dataset.

### Replication


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
