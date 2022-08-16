import Vue from "vue"
import htmlparser from "htmlparser"
export default Vue.component("md-preview", {
    props: {
        html: {
            type: String,
            default: ""
        }
    },
    methods: {
        m_render(c) {
            let handler = new htmlparser.DefaultHandler(function (error, dom){})
            let parser = new htmlparser.Parser(handler)
            parser.parseComplete(this.html)
            const dom = handler.dom

            const children = this.m_render_children(c, dom)
            return c("div", children)
        },
        m_render_children(c, children) {
            if (children == undefined || children.length == 0) return
            return children.map(v=>this.m_render_node(c, v)).filter(v=>v)
        },
        m_render_node(c, node) {
            if (node.type == "text") return this._v(node.data)
            if (node.type == "tag") 
                return c(node.name, {attrs: node.attribs}, 
                    this.m_render_children(c, node.children))
        }
    },
    render(c) {
        const h = this.html
        return this.m_render(c)
    }
})