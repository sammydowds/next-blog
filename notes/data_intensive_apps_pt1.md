---
title: "Designing Data-Intensive Apps (PART 1)"
description: "My personal notes from part 1 of 'Designing Data-Intesive Applications' by Martin Kleppman"
date: "01/01/2024"
labels: "data"
---

# Data-Intesive Applications (PART 1)

I started reading [this book](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321) after being laid off. A lot of people online recommended it, and I figured it would be great to dive into something more technical while job hunting. 

On top of that, I have implemented some patterns myself at my previous job (batch jobs, streaming data) and wanted to have a deeper knowledge on topics surrounding those patterns. 

## Chapter 1 - Reliable, Scalable, Maintainable Applications

Many applications today are data-intesive, and not necessarily CPU intensive. Why? Because applications today typically deal with large amounts of data, complex data, and quickly changing data.

How do you ensure the data remains correct and complete? Even when things go wrong.
How do you provide conistently good performance to clients even when your system is degraded?
How do you scale to handle an increase in load?
What does a good API for the service look like?

"There are many factors that may influence the design of a data system, including the
skills and experience of the people involved, legacy system dependencies, the time‐
scale for delivery, your organization’s tolerance of different kinds of risk, regulatory
constraints, etc. Those factors depend very much on the situation." - **pg 5**


### Maintainability 

#### Operability 
- Provide visibility into the system
- Use standard tools
- Avoid dependency on indivdual machines
- Provide good documentation and easy-to-understand operational models

#### Simplicity 
- Remove accidental complexity (I love this, its accidental if it is not inherent in the problem the software solves - but arises only from the implementation). How do you remove it? Create a simple to use abstraction.
- Create good abstractions (the book mentions it will go into more detail on this later)

#### Evolvability 
- Agility on a data system, the ability to modify and adap the system to changing requirements

## Chapter 2 - Data Models and Query Languages

There are three main data models: relational, document, and graph-based.

### Relational And Document Models

SQL is the best-known data model (relational model). It is comprised of an unordered collection of tuples (rows). Originally created in the 1970s to create a cleaner interface for business data processing. 

In 2010, NoSQL was introduced as a competitor to scale better, be OSS, specialized query operations not well supported by relational model, less restrictive schemas, and a desire for more dynamic and expressive data model.

A common critism of relational models is the fact you need a translation layer (ORM) - this is sometimes called an [impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch). After digging into that a bit, I think specifically its the difference between Object-orientation (objects referencing each other) and the fact that relational is tuples in a table - directed graphs vs undirected graphs. 

There is a simple, yet effective example in this chapter about how to best model a resume (or LinkedIn profile). Option A) create multiple tables to store positions, education, jobs and then relate them to an id, or Option B) store the data as JSON - one query, efficient, explicit.

However, as features are introduced the complexity of the data model increases. They expand the example of when multiple people want to reference living in the same region or when one user might want to recommend another. This introduces many to many and one to many relationships, which become more complex to model with purely documents. I personally feel that most applications would benefit from normalization and utilizing a relational modeling plus the ability to join that data.  

At this point, took a small break to research the inventor of the relational model - [Edgar Todd](https://en.wikipedia.org/wiki/Edgar_F._Codd).

### Graph-Like Data Models

As connections grow within your data, it becomes more natural to start modeling your data as a graph. A graph consists of two kinds of objects - _vertices_ and _edges_. _Vertices_ are nodes or entities. _Edges_ are relationships or arcs.

Graph-like data models arent limited to homogenous data. You can also consitently store different types of objects in a single data store. For example, Facebook's vertices might represent peope, locations, events, checkins, and comments. 

Types of graph-like models include **property graphs**(Neo4j, Titan, and InfiniteGraph) and **triple stores** (Datomic, AllegroGraph). 

**Examples**: 
- Social graphs: vertices are people, edges indicate which people know each other
- Web graph: vertices are web pages, edges indicate html links to other pages
- Road or rail networks: vertices are junctions, edges represent the roads or railways between them

#### Property Graphs

Vertex: 
- a unique id
- set of outgoing edges
- set of incoming edges
- collection of properties (key values)

Edges: 
- a unique id
- vertex at which the edge starts (tail vertex)
- vertex at which the edge ends (head vertex)
- a label to describe the kind of relationship between the two vertices - this is the key to understaning property graphs
- collection of properties (key values)

A label for edges, might look like **within** (regions), **born_in**, **lives_in**, etc. I find this attribute the key to understanding property graphs.


#### Triple store

All information is stored in a form very simple three-part statements: _subject_, _predicate_, and _object_. 

A _subject_ of a triple is equivalent to a vertex in a graph. For example: _Jim_, likes, apples. The _predicate_ would be the label of the edge. 

The _object_ is one of two things:
1. A value - "{ _predicate_:_object_ }", ie { age: 33 }
2. Another vertex, in this case the predicate is an edge in the graph and the subject is a tail vertex, and the object is the head vertex. For example, (_lucy_, _marriedTo_, _alain_)

### Query Languages for Data

SQL is a _declarative_ query language, while IMS/CODASYL queried the data base using _imperative code_. 

```sql
-- declarative 
SELECT * FROM animals WHERE family = 'sharks';
```

An imperative language tells the computer to perform certain operations in a certain order. In a declarative query language, you just specify the pattern of the data you want.

```js
// imperative
function getSharks() { var sharks = [];
for (var i = 0; i < animals.length; i++) { if (animals[i].family === "Sharks") {
                sharks.push(animals[i]);
            }
}
return sharks; }
```

Another good example of the distinction, would be CSS (declarative) vs JS (imperative) in the web browser to style a selected element. 

### Summary of Chapter 2 

1. Document databases target use cases where data comes in self-contained documents and relationships between one document and another are rare
2. Graph databases go in the opposite direction, targeting use cases where anything is potentially related to everything


Overall, all three models are popular today (document, relational, and graph).

## Chapter 3 - Storage and Retrieval

Why care about how the database handles storage and retrieval internally? You will need to select a storage engine that is appropriate for your application. In which, the book covers two types of storage engines: _log-structured_ and _page-oriented_. 

Many databases use a _log_, which is an append-only data file. Note: log is not the traditional "log", but rather an append-only sequence of records. To help find a particular key in the database a different data-structure (metadata) is used to act as a signpost to help locate the data - this is called an _index_. Well-chosen indexes speed up read queries, but every index slows down writes.

### Hash Indexes

Keep an _in-memory_ hash map where every key is mapped to a byte offset in the data file stored _on-disk_ (the location at which the value can be found). Whenever appending new key, value pairs you also updat the hash map to reflect the offset of the data you just wrote.

#### Optimizing Memory

Break the data file into segments (create a new segment once the file hits a mem limit). On those segments, perform compaction - meaning throw away duplicate keys in the log, and only keep the most recent update for each key. During compaction, you can also merge several segments together. The merged segment is written to a file, and then the read process switched to that merged segment. The old segments can now be deleted.  

Each segment will have its own in memory hash table, mapping keys to the file offsets. First check most recent segment's hash map, if not there, check the second-most-recent segment. Repeat. 

### SSTables and LSM-Trees

Sorted String Table means that there is a requirement to sort the key-value pairs _by key_ and that each key only appears _once_ in each merged segment file (although compaction should already ensure that).

This approach has several advantages over log segments with hash indexes: 
- Merging segments is simple and efficient (same approach as mergesort)
- You no longer need an index of all keys in memory, but rather can rely on the sort assuming you know two keys it could be between. So you could have one key for every few kb.
- Reduced I/O bandwidth because you group the records and compress the data before writing to disk (data between two indexes)

#### Constructing and maintaining SSTables

How do you sort the data?
1. Write comes in, add it to an in-mem balanced tree data (red-black tree), called a _memtable_ 
2. When the memtable gets too big, write it to disk as an SSTable. This file becomes the most recent segment of the database.
3. For a read, try to find data in the _memtable_, then in the most recent on-disk segment, then older segment 
4. Periodically run a merging and compaction process in the background

One big issue - if the database crashes, the most recent writes (_memtable_) are lost. To avoid this issue, we can keep a separate log on disk to which every write is appended.

### B-Trees

In previous examples, the log-structured indexes were broken into variable-size segments, several MB in size, and always write sequentially. B-Tress break the database down into fixed-size blocks or pages (4kb typically), and read or write one page at a time. Note: this corresponds with how hardware is arranged, fixed-size blocks.

Each page is identified using an address or location. One page can refer to another - similar to a pointer, but on disk instead of in-memory. With this reference you can construct a tree of pages.

One page is designed as the _root_ of the B-tree. The page contains keys and references to child pages. Eventually you get to a leaf page, containing values.  

The number of references to a child pages in one page of the B-tree is called the _branching factor_. 

#### Updating a B-Tree

Updating a _value_, find the leaf page containing that key, change the value, write the page back to disk. Adding a new key, you need to find the page whose key range encompasses the new key. If there is not enough memory, you split that page. Then, update the references of the parent page. This ensures the tree is _balanced_. 

A B-Tree with _n_ keys always has depth of _O_(log _n_). Most databases are three or four levels deep (4KB pages with branching factor of 500 store up to 256TB)

#### Resilience

B-Trees rely on overwriting a page on disk. This is different from log-structured indexes, which only append to files but never modify in place. 

B-tree implementations include an additonial data structure, _write-ahead log_ (WAL), which is an append-only file to which every B-tree modification is written. 

#### Optimizations

- Instead of maintaining a WAL, a modified page is written to a different location
- Shorten the keys (abbreviating enough to still have boundary between keys), improving branch factor
- Lay out the tree so that leaf pages appear in sequential order on disk
- Storing sibling page references on a leaf page (no need to go back to the parent)

## Comparing B-Trees and LSM-Trees

A rule of thumb: B-trees are thought to be faster for reads, while LSM-trees are typically faster for writes. 

## Transaction Processing or Analytics?

Online Transaction Processing (OLTP) vs Online Analytic Processing (OLAP)

OLTP - application looks up small number of records by some key, using an index 
OLAP - scan over a huge number of records, only reading a few columns per record, and calculates aggregate statistics vs returning raw data

Introducing the need for a data warehouse.

### Stars and Snowflakes: Schemas for Analytics

In the star schema, a _fact table_ contains rows which represent an event that occurred at a particular time.

Columns in the fact table could be attributes (price) or _dimensions_. Dimensions are foreign keys to other tables (SKU, brand name, package size, etc). _Star schema_ gets its name because you can visualize the _fact table_ as being in the middle surrounded by dimensions tables and the connections acting as rays of a star. A _snowflake schema_ is similar - but the _dimensions_ might contain _sub-dimensions_. 

Fact tables might have 100 columns, or sometimes several hundred. Meaning they are very wide, including the dimensions. 

## Summary of Chapter 3

- OLTP systems are user-facing typically. Disk seek time is the bottleneck. 
- Data warehouses are not used by end users. Disk bandwidth is often the bottleneck here. 
- OLTP: log structured school, append to files and deleting obsolute files. LSM-Tree
- OLTP: Update in place, B-trees, used in a major portion of relational databases

## ...to be continued (I update this note after reading a chapter at a time)
