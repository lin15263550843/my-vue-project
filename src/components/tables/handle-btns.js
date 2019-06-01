const btns = {
    delete: (h, params, vm) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '你确定要删除吗?'
            },
            on: {
                'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                }
            }
        }, [
            h('Button', {
                props: {
                    type: 'text',
                    ghost: true
                }
            }, [
                h('Icon', {
                    props: {
                        type: 'md-trash',
                        size: 18,
                        color: '#000000'
                    }
                })
            ])
        ])
    },
    test: (h, params, vm) => {
        return h('div', {
            props: {
                type: 'text',
                ghost: true
            },
            style: {
                display: 'inline-block',
                color: '#4192E9',
                padding: '5px 15px 6px 0',
                lineHeight: 1.5,
                fontWeight: 'bold',
                cursor: 'help'
            }
        }, [
            h('span', {
                props: {},
                style: {
                    // color: '#0000ff',
                    verticalAlign: 'middle'
                }
            }, '测试')
        ])
    }
}

export default btns
