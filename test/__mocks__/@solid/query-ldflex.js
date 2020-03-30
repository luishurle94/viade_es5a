jest.requireActual('@solid/query-ldflex').default;

const graph = {
  'me': {
    'friends': [
      'friend1',
      'friend2'
    ],
    storage: 'http://www.user.com'
  },
  'friend1': {
    vcard_fn: 'fn1',
    'solid:account': 'webId1',
    'solid:hasPhoto': 'image1',
  },
  'friend2': {
    vcard_fn: 'fn2',
    'solid:account': 'webId2',
    'solid:hasPhoto': 'image2',
  },
  'http://www.friend3.com': {
    vcard_fn: 'fn3',
    'solid:account': 'webId3',
    'solid:hasPhoto': {
      add: async(obj) => true,
      remove: async(obj) => true
    },
  },
  'http://www.friend3.comfolderfilename': {
    vcard_fn: 'fn3',
    'solid:account': 'webId3',
    'solid:hasPhoto': {
      add: async(obj) => true,
      remove: async(obj) => true
    },
  },
}

export default graph