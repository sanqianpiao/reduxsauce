## About
This repository is fork from [reduxsauce](https://github.com/skellock/reduxsauce), thanks to [@skellock](https://github.com/skellock).

## Added Feature
In my practice, I used "createActions" to create "Creattors" and "Types", and my Apps usually consisted of many redux. Those redux's Types may have the same name, So I add a "prefix" parameter to "createActions".

    const { Creators, Types } = createActions({ one: null }, 'PREFIX_')

    //Types:
    //{ ONE: 'PREFIX_ONE' }

    //Creators.one()
    //{ type: 'PREFIX_ONE' }
