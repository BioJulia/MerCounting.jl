var documenterSearchIndex = {"docs":
[{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"CurrentModule = MerCounting","category":"page"},{"location":"man/basic_counting/#Basic-types-and-basic-kmer-counting-1","page":"Basic types and counting","title":"Basic types and basic kmer counting","text":"","category":"section"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"MerCounting has a few basic types and methods to allow you do easily do some basic kmer counting.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"The first and perhaps most obvious of these is a type to represent a kmer and its frequency, for this, MerCounting provides the MerCount type.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"If you have a MerCount variable you can get the kmer value or the frequency value using the mer and freq getter methods.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"A vector of these MerCounts constitute one option for a simple data structure for representing kmer frequency data. This packages defines other more dedicated types, but we will get to those in later sections of this manual.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"Ok, so let's do some very basic kmer counting for a sequence!","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"First we need a sequence:","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"using MerCounting\nusing BioSequences\ns = randdnaseq(50)","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"Ok, let's say we wanted to count the 7-mers, we can collect all the 7-mers using BioSequences' kmer iterator:","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"sevenmers = collect(each(DNAMer{7}, s))\nsevenmers[1]","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"Ok BioSequences' kmer iterator on its own yields a MerIterResult, which contains a tuple of (Base position in sequence, kmer, reverse complement of the kmer).","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"Now let's say I was only interested in counting canonical kmers in s. For any kmer and its reverse complement, the canonical version is the one that is lexicographically less.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"So let's revise our collect above to give us a vector of the canonical kmers. Thankfully, BioSequences comes with a method called canonical, for exactly this purpose.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"sevenmers = collect(canonical(x) for x in each(DNAMer{7}, s))","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"If you wanted to collect all the kmers in s \"as is\" as it were, you can use the fwmer method provided with BioSequences for this purpose.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"collect(fwmer(x) for x in each(DNAMer{7}, s))","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"This is quite nice and terse code, but we haven't used MerCounting to help us at all yet. MerCounting allows us to achieve the above with the use of a single function called collect_mers, instead of collecting a generator:","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"sevenmers = collect_mers(CANONICAL, each(DNAMer{7}, s))","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"There are a few different methods of collect_mers for different types of input, check out the API reference for more info.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"MerCounting exports CANONICAL and NONCANONICAL, which work with collect_mers and other MerCounting functions to dictate how the kmers are produced.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"Ok so we have our canonical kmers, how can we count them? Well one of the ways to count the number of distinct values in a vector is to sort it and traverse it in one go. The collapse_into_counts! methods do this for you.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"note: Note\ncollapse_into_counts! will sort the input sevenmers vector in place.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"mercounts = collapse_into_counts!(sevenmers)","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"Looks like every distinct kmer appeared once. Well that's to be expected! We did just do this with a single 50bp long random sequence after all!","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"So for any sequence or input we want to count kmers for, we have to collect_mers and then collapse them into counts with collapse_into_counts!.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"For convenience and more terse code, MerCounting provides a constructor for vectors of MerCount that does this for you.","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"v = Vector{MerCount{DNAMer{7}}}(CANONICAL, s)","category":"page"},{"location":"man/basic_counting/#","page":"Basic types and counting","title":"Basic types and counting","text":"","category":"page"},{"location":"api/MerCount/#","page":"MerCount","title":"MerCount","text":"CurrentModule = MerCounting","category":"page"},{"location":"api/MerCount/#API:-MerCount-1","page":"MerCount","title":"API: MerCount","text":"","category":"section"},{"location":"api/MerCount/#Types-1","page":"MerCount","title":"Types","text":"","category":"section"},{"location":"api/MerCount/#","page":"MerCount","title":"MerCount","text":"MerCount\nDNAMerCount\nRNAMerCount","category":"page"},{"location":"api/MerCount/#MerCounting.MerCount","page":"MerCount","title":"MerCounting.MerCount","text":"A simple mer count struct.\n\nMerCount is a simple struct that binds a mer value to a count of the number of times it has been observed.\n\nThis type, (sorted) vectors of them, and some additional utility methods, can form the basic building blocks of the higher-level mer counting functionality. This struct can also be an eltype of kmer hashes or more involved specialized types that store counts of Kmers.\n\nnote: Note\nThe count is stored as an UInt8 because often once the count is more than 255 we hardly care anymore.\n\n\n\n\n\n","category":"type"},{"location":"api/MerCount/#MerCounting.DNAMerCount","page":"MerCount","title":"MerCounting.DNAMerCount","text":"Shorthand for MerCount{DNAMer{K}}\n\n\n\n\n\n","category":"type"},{"location":"api/MerCount/#MerCounting.RNAMerCount","page":"MerCount","title":"MerCounting.RNAMerCount","text":"Shorthand for MerCount{RNAMer{K}}\n\n\n\n\n\n","category":"type"},{"location":"api/MerCount/#Public-/-Safe-methods-1","page":"MerCount","title":"Public / Safe methods","text":"","category":"section"},{"location":"api/MerCount/#","page":"MerCount","title":"MerCount","text":"mer\nfreq\nmerge\ncollect_mers\ncollapse_into_counts\ncollapse_into_counts!\nmerge_into!\ncollapse!","category":"page"},{"location":"api/MerCount/#MerCounting.mer","page":"MerCount","title":"MerCounting.mer","text":"Get the mer from a MerCount.\n\n\n\n\n\n","category":"function"},{"location":"api/MerCount/#MerCounting.freq","page":"MerCount","title":"MerCounting.freq","text":"Get the count from a MerCount.\n\n\n\n\n\nGet the count from a MerCount, and convert it to type R.\n\n\n\n\n\n","category":"function"},{"location":"api/MerCount/#MerCounting.collapse_into_counts!","page":"MerCount","title":"MerCounting.collapse_into_counts!","text":"collapse_into_counts!(result::Vector{MerCount{M}}, mers::Vector{M}) where {M<:AbstractMer}\n\nBuild a vector of sorted MerCounts from a Vector of a mer type.\n\nThis is a basic kernel function used for any higher level and more complex kmer counting procedures.\n\nThis is like collapse_into_counts, except it's first argument is a result vector that is cleared and filled with the result.\n\nnote: Note\nThe input vector mers will be sorted by this method.\n\n\n\n\n\ncollapse_into_counts(mers::Vector{M}) where {M<:AbstractMer}\n\nBuild a vector of sorted MerCounts from a Vector of a mer type.\n\nThis is a basic kernel function used for any higher level and more complex kmer counting procedures.\n\nnote: Note\nThe input vector mers will be sorted by this method.\n\n\n\n\n\n","category":"function"},{"location":"api/MerCount/#MerCounting.merge_into!","page":"MerCount","title":"MerCounting.merge_into!","text":"merge_into!(a::Vector{MerCount{M}}, b::Vector{MerCount{M}}) where {M<:AbstractMer}\n\nMerge the MerCounts from vector b into the vector a.\n\nnote: Note\nThis will sort the input vectors a and b.\n\n\n\n\n\n","category":"function"},{"location":"api/MerCount/#Internal-/-Unsafe-methods-1","page":"MerCount","title":"Internal / Unsafe methods","text":"","category":"section"},{"location":"api/MerCount/#","page":"MerCount","title":"MerCount","text":"unsafe_collapse_into_counts!\nunsafe_merge_into!","category":"page"},{"location":"api/MerCount/#MerCounting.unsafe_collapse_into_counts!","page":"MerCount","title":"MerCounting.unsafe_collapse_into_counts!","text":"unsafe_collapse_into_counts!(result::Vector{MerCount{M}}, mers::Vector{M}) where {M<:AbstractMer}\n\nwarning: Warning\nThis method is internal and marked as unsafe because it assumes that the mers input vector is already sorted.\n\n\n\n\n\n","category":"function"},{"location":"api/MerCount/#MerCounting.unsafe_merge_into!","page":"MerCount","title":"MerCounting.unsafe_merge_into!","text":"unsafe_merge_into!(a::Vector{MerCount{M}}, b::Vector{MerCount{M}}) where {M<:AbstractMer}\n\nMerge the MerCounts from vector b into the vector a.\n\nwarning: Warning\nThis method is marked as unsafe as it assumes both of the input vectors a and b are already sorted.\n\n\n\n\n\n","category":"function"},{"location":"#","page":"Home","title":"Home","text":"(Image: Latest release) (Image: MIT license)  (Image: Stable documentation) (Image: Pkg Status) (Image: Chat)","category":"page"},{"location":"#Description-1","page":"Home","title":"Description","text":"","category":"section"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"MerCounting is currently in pre-alpha development. But you can clone MerCounting from the Julia REPL:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> Pkg.clone(\"https://github.com/BioJulia/MerCounting.jl.git\")","category":"page"},{"location":"#Testing-1","page":"Home","title":"Testing","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"MerCounting is tested against Julia 1.X on Linux, OS X, and Windows.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Latest build status:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: ) (Image: )","category":"page"},{"location":"#Contributing-1","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We appreciate contributions from users including reporting bugs, fixing issues, improving performance and adding new features.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Take a look at the contributing files detailed contributor and maintainer guidelines, and code of conduct.","category":"page"},{"location":"#Financial-contributions-1","page":"Home","title":"Financial contributions","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We also welcome financial contributions in full transparency on our open collective. Anyone can file an expense. If the expense makes sense for the development of the community, it will be \"merged\" in the ledger of our open collective by the core contributors and the person who filed the expense will be reimbursed.","category":"page"},{"location":"#Backers-and-Sponsors-1","page":"Home","title":"Backers & Sponsors","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Thank you to all our backers and sponsors!","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Love our work and community? Become a backer.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: backers)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Does your company use BioJulia? Help keep BioJulia feature rich and healthy by sponsoring the project Your logo will show up here with a link to your website.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: ) (Image: )","category":"page"},{"location":"#Questions?-1","page":"Home","title":"Questions?","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"If you have a question about contributing or using BioJulia software, come on over and chat to us on Gitter, or you can try the Bio category of the Julia discourse site.","category":"page"},{"location":"man/installation/#Package-installation-1","page":"Installation","title":"Package installation","text":"","category":"section"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"MerCounting is a component of the GenomeGraphs framework for graph based genome assembly and analysis. So if you've installed GenomeGraphs, you should already have it.","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"However, MerCounting has been designed to be generally useful in other settings and projects too. So it can be installed on its own as well.","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"MerCounting is made available to install through BioJulia's package registry.","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"Julia by default only watches the \"General\" package registry, so before you start, you should add the BioJulia package registry.","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"Start a julia terminal, hit the ] key to enter pkg mode (you should see the prompt change from julia> to pkg>), then enter the following command:","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"pkg> registry add https://github.com/BioJulia/BioJuliaRegistry.git","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"After you've added the registry, you can install GenomeGraphs from the julia REPL. Press ] to enter pkg mode again, and enter the following:","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"pkg> add MerCounting","category":"page"},{"location":"man/installation/#","page":"Installation","title":"Installation","text":"If you are interested in the cutting edge of the development, please check out the master branch to try new features before release.","category":"page"}]
}
