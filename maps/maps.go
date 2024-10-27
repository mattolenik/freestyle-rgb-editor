package maps

import "iter"

type StableMap[K comparable, V any] struct {
	dict       map[K]V
	keys       []*K
	keyToIndex map[K]int
}

func NewStableMap[K comparable, V any](capacity int) *StableMap[K, V] {
	return &StableMap[K, V]{
		dict:       make(map[K]V, capacity),
		keys:       make([]*K, 0, capacity),
		keyToIndex: make(map[K]int, capacity),
	}
}

func ToStableMap[K comparable, V any, T any](items []T, mapFn func(T) (K, V)) *StableMap[K, V] {
	result := NewStableMap[K, V](len(items))
	for _, item := range items {
		result.Set(mapFn(item))
	}
	return result
}

func (om *StableMap[K, V]) Set(key K, value V) bool {
	_, exists := om.dict[key]
	if !exists {
		om.dict[key] = value
		om.keyToIndex[key] = len(om.keys)
		om.keys = append(om.keys, &key)
		return false
	}
	om.dict[key] = value
	return true
}

func (om *StableMap[K, V]) Items() iter.Seq2[K, V] {
	return func(yield func(K, V) bool) {
		for _, key := range om.keys {
			if !yield(*key, om.dict[*key]) {
				return
			}
		}
	}
}
